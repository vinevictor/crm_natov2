import { BotaoRetorno } from "@/app/componentes/btm_retorno";
import { CardCreateUpdate } from "@/app/implementes/cardCreateUpdate";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import BotaoCancelar from "@/app/componentes/btn_cancelar";
import { Metadata } from "next";
import FinanceiraProvider from "@/provider/FinanceiraProvider";
import FinanceiraCreate from "@/actions/financeira/service/createFinanceira";

export const metadata: Metadata = {
  title: "CADASTRO DE FINANCEIRA",
};

export default function CadastrarFinanceira() {



  return (
    <>
      <Flex
        w={"100%"}
        minH={"90.9dvh"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          w={"70%"}
          bg={"gray.50"}
          borderRadius={"1rem"}
          boxShadow={"lg"}
          p={8}
        >
          <Flex justifyContent={"space-between"}>
            <Box>
              <BotaoRetorno rota="/financeiras" />
            </Box>
            <Heading>Criar Financeira</Heading>
            <Box> </Box>
          </Flex>
          <Divider my={4} borderColor="gray.300" />
          <CardCreateUpdate.Form action={FinanceiraCreate}>
            <Flex w={"full"} flexWrap={"wrap"} gap={5}>
              <FinanceiraProvider>
                <CardCreateUpdate.GridCnpj w={"15rem"} />
                <CardCreateUpdate.GridRazaoSocial w={"35rem"} />
                <CardCreateUpdate.GridRazaoSocialTel w={"10rem"} />
                <CardCreateUpdate.GridRazaoSocialEmail w={"30rem"} />
                <CardCreateUpdate.GridResponsavel w={"25rem"} />
                <CardCreateUpdate.GridFantasia w={"15rem"} />
              </FinanceiraProvider>
              <Spacer />
              <Button
                type="submit"
                mt={2}
                alignSelf={"center"}
                colorScheme="green"
                size="lg"
              >
                Salvar
              </Button>
              <BotaoCancelar
                mt={2}
                alignSelf={"center"}
                colorScheme="red"
                variant="outline"
                size="lg"
              />
            </Flex>
            <Divider my={4} borderColor="gray.300" />
            <Flex w={"full"} justifyContent={"end"}></Flex>
          </CardCreateUpdate.Form>
        </Box>
      </Flex>
    </>
  );
}