"use client";
import useUserRegisterContext from "@/hook/useUserRegister";
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Select,
  SelectProps,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { BeatLoader } from "react-spinners";

interface SelectUserconstrutoraProps extends SelectProps {
  setValue: any;
}

export function SelectUserconstrutora({
  setValue,
  ...props
}: SelectUserconstrutoraProps) {
  const [Construtora, setConstrutora] = useState<number | undefined>();
  const [ConstrutoraData, setConstrutoraData] = useState([]);
  const [ConstrutoraArray, setConstrutoraArray] = useState<any>([]);
  const [ConstrutoraArrayTotal, setConstrutoraArrayTotal] = useState<any>([]);
  const [ConstrutoraDisabled, setConstrutoraDisabled] = useState(false);
  const { setContrutoraCX } = useUserRegisterContext();

  useEffect(() => {
    const getConstrutora = async () => {
      const response = await fetch("/api/construtora/getall");
      const data = await response.json();
      setConstrutoraData(data);
    };
    getConstrutora();
  }, []);

  // const GetConstrutora = async (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const value = e.target.value;
  //   const response = await fetch(`src/app/api/construtora/get/${value}`);
  //   const data = await response.json();
  //   setConstrutora(data);
  // };

  const HandleSelectConstrutora = () => {
    setConstrutoraDisabled(true);
    const value = Construtora;

    const Filtro = ConstrutoraData.filter((e: any) => e.id === Number(value));
    const Ids = Filtro.map((e: any) => e.id);

    setConstrutoraArray([...ConstrutoraArray, ...Ids]);
    setConstrutoraArrayTotal([...ConstrutoraArrayTotal, ...Filtro]);

    setConstrutoraDisabled(false);
  };

  const RendBoard = ConstrutoraArrayTotal.map((e: any) => {
    return (
      <>
        <Flex
          gap={1}
          border="1px solid #b8b8b8cc"
          p={1}
          alignItems={"center"}
          borderRadius={9}
          bg={"blue.200"}
        >
          <Text fontSize={"0.6rem"}>{e.nome}</Text>
          <Icon
            as={RxCross2}
            fontSize={"0.8rem"}
            onClick={() => {
              setConstrutoraArray(
                ConstrutoraArray.filter((item: any) => item !== e.id)
              );
              setConstrutoraArrayTotal(
                ConstrutoraArrayTotal.filter((item: any) => item !== e)
              );
            }}
            cursor={"pointer"}
          />
        </Flex>
      </>
    );
  });

  useEffect(() => {
    setContrutoraCX(ConstrutoraArray);
  }, [ConstrutoraArray]);

  return (
    <>
      <Flex gap={2}>
        <Select
          {...props}
          border="1px solid #b8b8b8cc"
          borderTop={"none"}
          borderRight={"none"}
          borderLeft={"none"}
          borderRadius="0"
          bg={"gray.100"}
          borderColor={"gray.400"}
          isDisabled={ConstrutoraDisabled}
          onChange={(e: any) => setConstrutora(e.target.value)}
          value={Construtora}
        >
          <option style={{ backgroundColor: "#EDF2F7" }} value={0}>
            Selecione uma construtora
          </option>
          {ConstrutoraData.length > 0 &&
            ConstrutoraData.map((construtora: any) => (
              <option
                style={{ backgroundColor: "#EDF2F7" }}
                key={construtora.id}
                value={construtora.id}
              >
                {construtora.fantasia}
              </option>
            ))}
        </Select>
        <Button
          colorScheme="green"
          leftIcon={<FaPlus />}
          isLoading={ConstrutoraDisabled}
          spinner={<BeatLoader size={8} color="white" />}
          onClick={HandleSelectConstrutora}
        >
          Adicionar
        </Button>
      </Flex>
      <Flex gap={2} mt={3} flexWrap="wrap">
        {RendBoard}
      </Flex>
      <Box>
        <Input name="construtora" value={ConstrutoraArray} />
      </Box>
    </>
  );
}