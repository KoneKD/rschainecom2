"use client";
import Navbar from "@/components/Navbar";
import InputBar from "@/components/InputBar";
import { useMediaQuery } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Label,
  FormControl,
  Flex,
  FormLabel,
  Input,
  Link,
  Stack,
  Checkbox,
  Box,
  Image,
  Alert,
  useToast,
  Toast,
  Center,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/router";
import { app } from "@/FIREBASE/clientApp";

import TransitionExample from "@/components/forgetPassword";

export default function Connexion() {
  const [isLagerThan768] = useMediaQuery("(min-width: 768px)");
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const auth = getAuth(app);
  const router = useRouter();
  const toast = useToast();

  const getTime = () =>{
    const currentTime = new Date()
    const timestanp = currentTime.getTime()
    localStorage.setItem("time",timestanp)
    console.log("okay")
  }



  const loginUSer = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        getTime()
        setEmail(userCredential.user.email);
        sessionStorage.setItem("email",userCredential.user.email)
        // router.back()
        toast({
          title: "ACCES AUTORISE.",
          description: "Bon Achat",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        router.back();
      })
      .catch((error) => {
        // throw error;
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorMessage == "Firebase: Error (auth/user-not-found).") {
          // console.log("VEUILLEZ VERIFIER VOS INFOS DE CONNEXION");
          toast({
            title: "ACCES REFUSE.",
            description: "VEUILLEZ VERIFIER VOS ACCES",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
       
         if (error.code== "auth/too-many-requests") {
          toast({
            title: "TROP DE TENTATIVES.",
            description: "VEUILLEZ REESAYER PLUS TARD",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
         } else {
            if (error.code == "auth/wrong-password") {
              toast({
                title: "MOT DE PASSE/IDENTIFIANT INCORRECT",
                description: "VEUILLEZ VERIFIER VOS ACCES",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            }else{
              if (error.code == "auth/invalid-email") {
                toast({
                  title: "MOT DE PASSE/IDENTIFIANT INCORRECT",
                  description: "VEUILLEZ VERIFIER VOS ACCES",
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              }else{
                // console.log(error);
              };
            }
         }
        }
      });
  };

  return (
    <>
      <InputBar />
      {isLagerThan768 ? <Navbar></Navbar> : <></>}
      {/* <Navbar /> */}
      <Center>
        <Flex
          bgColor={["#dee2e6","#dee2e6","white","white","white"]}
          borderRadius={5}
         
          w={"90%"}
          h={500}
          mx={[5, 5, 5, 5, 12]}
          my={5}
          // boxShadow={"0px 4px 24px "}
  
        >
          <Box h={500}>
            <Image
              height={500}
              alt={'logo'}
              width={650}
              src="/logo1.png"
              display={["none", "none", "flex", "flex", "flex"]}
            />
          </Box>
          <Center>
            <Box width={"full"} color={"black"} ml={[10, 10, 10, 20, 20]}>
              <Stack spacing={4}>
                <Heading>Bienvenue</Heading>
                <Text>Connectez-vous á votre compte</Text>
                <Input
                  type={"text"}
                  placeholder="Email"
                  border={"2px solid gray"}
                  borderRadius={"50px"}
                  width={["200px", "200px", "350px", "350px", "350px"]}
                  onChange={(ev) => setEmail(ev.target.value.trim().toLowerCase())}
                  color={"gray.500"}
                />
                <Input
                  type={"password"}
                  placeholder={"Mot de passe"}
                  border={"2px solid gray"}
                  borderRadius={"50px"}
                  onChange={(e) => setPassword(e.target.value)}
                  width={["200px", "200px", "350px", "350px", "350px"]}
                />
                <TransitionExample/>
                <Button
                  borderRadius={"50px"}
                  bgColor={"#08566e"}
                  color={"white"}
                  _hover={{
                    bg: '#08566e',
                  }}
                  onClick={() => loginUSer()}
                >
                  Connexion{" "}
                </Button>
                <Link mt={20} fontSize={20} textAlign={'center'}  _hover={{
                color: 'blue',
              }} href={'/Inscription'}>
                  Inscription
                </Link>
              </Stack>
            </Box>
          </Center>
        </Flex>
      </Center>
    </>
  );
}
