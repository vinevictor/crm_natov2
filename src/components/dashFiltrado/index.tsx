"use client";
import { AnosOptions } from "@/data/anos";
import { MesesOptions } from "@/data/meses";
import { Box, Select, Button, useToast, Flex, Text, Divider } from "@chakra-ui/react";
import { useState } from "react";
import PieChart from "../pieChart.tsx";
import DoughnutChart from "../doughnutChart";
import { useSession } from "next-auth/react";

interface DashFiltradoProps {
  construtoras: any;
  empreendimentos: any;
  financeiras: any;
}

export default function DashFiltrado({
  construtoras,
  empreendimentos,
  financeiras,
}: DashFiltradoProps) {
  const [mes, setMes] = useState<string | null>(null);
  const [ano, setAno] = useState<string | null>(null);
  const [construtora, setConstrutora] = useState<string | null>(null);
  const [empreedimento, setEmpreendimento] = useState<string | null>(null);
  const [financeiro, setFinanceira] = useState<string | null>(null);
  const [dados, setDados] = useState<any | null>(null);
  const { data: session } = useSession(); 
  const toast = useToast()
  
  const hierarquia = session?.user?.hierarquia;

  const handleLimpar = async () => {
    setDados(null)
  }
  const handleSubmit = async () => {
    if(hierarquia !== 'ADM' && (construtora == null || empreedimento == null)){
      toast({
        title: "Erro no Filtro",
        description: `Selecione a Construtora e Empreendimento`,
        status: "error", 
        duration: 5000, 
        isClosable: true,
        position: "top-right" 
      });
      return;
    }

    const data = {
        mes,
        ano,
        construtora,
        empreedimento,
        financeiro
    }
    console.log("🚀 ~ handleSubmit ~ data:", data)
    try {
        const req = await fetch('http://localhost:3030/get/infos/search',{
           method: 'POST',
           headers: {
               "Content-Type": "application/json" 
           },
           body: JSON.stringify(data)
           
        })
   
        if (!req.ok) {
           toast({
             title: "Erro no Filtro",
             description: `Não foi possível buscar os dados. Status: ${req.status} - ${req.statusText}`,
             status: "error", 
             duration: 5000, 
             isClosable: true,
             position: "top-right" 
           });
           return;
         }else{
             const result = await req.json()
             setDados(result)
            
             toast({
                title: "Sucesso!",
                description: "Dados filtrados com sucesso.",
                status: "success", 
                duration: 3000,
                isClosable: true,
                position: "top-right"
              });
         }   
       
    } catch (error) {
        toast({
            title: "Erro no Servidor",
            description: "Ocorreu um erro ao tentar buscar os dados. Tente novamente mais tarde.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top-right"
          });
          console.error("Erro:", error);
        
    }
  }

  return (

    <>
    {/* filtro apenas para adm */}
    {hierarquia == 'ADM' &&(<>
          <Box display={"flex"} justifyContent={"center"} gap={2} w={"100%"}>
        <Select
          w={"135px"}
          placeholder="Mês"
          onChange={(e) => setMes(e.target.value)}
        >
          {MesesOptions.map((mes) => (
            <option key={mes.id} value={mes.id}>
              {mes.label}
            </option>
          ))}
        </Select>
        <Select
          w={"100px"}
          placeholder="Ano"
          onChange={(e) => setAno(e.target.value)}
        >
          {AnosOptions.map((ano) => (
            <option key={ano.id} value={ano.ano}>
              {ano.ano}
            </option>
          ))}
        </Select>
        <Select
          w={"200px"}
          value={construtora || ''}
          onChange={(e) => setConstrutora(e.target.value || null)}
        >
          <option value="">Construtora</option>
          {construtoras?.map((construtora: any) => (
            <option key={construtora.id} value={construtora.id}>
              {construtora.fantasia}
            </option>
          ))}
        </Select>
        <Select
          w={"200px"}
          placeholder="Empreendimento"
          onChange={(e) => setEmpreendimento(e.target.value)}
        >
          {empreendimentos?.map((empreendimento: any) => (
            <option key={empreendimento.id} value={empreendimento.id}>
              {empreendimento.nome}
            </option>
          ))}
        </Select>
        <Select w={"200px"} placeholder="Financeira" onChange={(e) => setFinanceira(e.target.value)}>
          {financeiras?.map((financeira: any) => (
            <option key={financeira.id} value={financeira.id}>
              {financeira.fantasia}
            </option>
          ))}
        </Select>
        <Button shadow={'md'}size={'sm'} colorScheme={'teal'} onClick={handleSubmit}>
            Filtrar
        </Button>
        <Button shadow={'md'}size={'sm'} colorScheme={'blue'} onClick={handleLimpar}>
          Limpar
        </Button>
      </Box>
    </>)}

    {/* filtro para todos */}
    {hierarquia !== 'ADM' &&(<>
          <Box display={"flex"} justifyContent={"center"} gap={2} w={"100%"}>
        <Select
          w={"135px"}
          placeholder="Mês"
          onChange={(e) => setMes(e.target.value)}
        >
          {MesesOptions.map((mes) => (
            <option key={mes.id} value={mes.id}>
              {mes.label}
            </option>
          ))}
        </Select>
        <Select
          w={"100px"}
          placeholder="Ano"
          onChange={(e) => setAno(e.target.value)}
        >
          {AnosOptions.map((ano) => (
            <option key={ano.id} value={ano.ano}>
              {ano.ano}
            </option>
          ))}
        </Select>
        <Select
          w={"200px"}
          value={construtora || ''}
          onChange={(e) => setConstrutora(e.target.value || null)}
        >
          <option value="">Construtora</option>
          {construtoras?.map((construtora: any) => (
            <option key={construtora.id} value={construtora.id}>
              {construtora.fantasia}
            </option>
          ))}
        </Select>
        <Select
          w={"200px"}
          value={empreedimento || ''}
          onChange={(e) => setEmpreendimento(e.target.value || null)}
        >
          <option value="">Empreendimento</option>
          {empreendimentos?.map((empreendimento: any) => (
            <option key={empreendimento.id} value={empreendimento.id}>
              {empreendimento.nome}
            </option>
          ))}
        </Select>
        {/* <Select w={"200px"} placeholder="Financeira" onChange={(e) => setFinanceira(e.target.value)}>
          {financeiras?.map((financeira: any) => (
            <option key={financeira.id} value={financeira.id}>
              {financeira.fantasia}
            </option>
          ))}
        </Select> */}
        <Button shadow={'md'}size={'sm'} colorScheme={'teal'} onClick={handleSubmit}>
            Filtrar
        </Button>
        <Button shadow={'md'}size={'sm'} colorScheme={'blue'} onClick={handleLimpar}>
          Limpar
        </Button>
      </Box>
    </>)}

      <Flex
          alignItems="flex-start"
          w="100%"
          gap={{ base: 4, md: 6 }}
          flexDir={{ base: "column", md: "row" }}
          justify="center"
          flexWrap="wrap"
        >
{dados ? <>
 <Flex
      w="100%"
      maxW="950px"
      h="auto"
      gap={2}
      bg="white"
      flexDirection={"column"}
    >
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-around"}
        p={5}
        bg="white"
        borderRadius="md"
        boxShadow="md"
      >
        <Flex flexDirection={"row"} gap={1}>
          <Text fontSize="xl" color={"#00713C"}>
          Quantidade de Certificados: 
          
          </Text>
          <Text fontSize="xl" color={"#1D1D1B"}>
            {dados ? dados.total_solicitacao : null}
          </Text>
        </Flex>
        <Flex flexDirection={"row"} gap={1}>
          <Text fontSize="xl" color={"#00713C"}>
          Media de Horas/Certificado:
          </Text>
          <Text fontSize="xl" color={"#1D1D1B"}>
            {dados ? dados.time : null}
          </Text>
        </Flex>
      </Box>
    </Flex>
</> : null}
<Divider />

          {/* Gráficos de Pizza */}
         {dados ? 
                   <Flex flexDirection="row" maxW={'1000px'} flexWrap={'wrap'} gap={4} justifyContent={'center'} >
            <PieChart
              title="Quantidade de RG e CNH"
              colors={["#1D1D1B", "#00713C"]}
              labels={["RG", "CNH"]}
              dataValues={dados ?[dados.rg, dados.cnh]: []}
              />
              {dados.suporte ? <Box w="60%" h="250px">
                <DoughnutChart 
            labels={dados.suporte_tag ? dados.suporte_tag.map((item : string) => item.split(" = ")[0]): null}
            dataValues={dados.suporte_tag ? dados.suporte_tag.map((item : string) => Number(item.split(" = ")[1])) : null }
            title={`Total Suporte : ${dados.suporte ? dados.suporte : 0 }`}
          /> 
                </Box>
          : null }        
            <PieChart
              title="Video Conferencia e Presencial"
              colors={["#00713C", "#1D1D1B"]}
              labels={["Video Conf.", "Presencial"]}
              dataValues={dados ? [dados.total_vc, dados.total_int] : []}
            />
            {dados.erros ? <Box w="60%" h="250px">
            <DoughnutChart
              labels={dados.erros_tag ? dados.erros_tag.map((item : string) => item.split(" = ")[0]): null}
              dataValues={dados.erros_tag ? dados.erros_tag.map((item : string) => Number(item.split(" = ")[1])) : null }
              title={`Total Erros : ${dados.erros ? dados.erros : 0 }`}
            /> 
            </Box> : null }


          </Flex>  
                 
         : null} 

        </Flex>
    </>
  );
}