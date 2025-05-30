"use client";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormLabel,
  Heading,
  Select,
  Textarea,
} from "@chakra-ui/react";
import HistoricoComponent from "../historico";
import MensagensChat from "../mensagensChat";

interface ChamadoProps {
  data: TypeChamado | null;
  session: SessionNext.Client;
}

type TypeChamado = {
  id: number;
  descricao?: string;
  status: string;
  idUser?: number;
  idResposta?: number;
  resposta?: string;
  createAt: string;
  updatedAt?: string;
  solicitacaoId?: number;
  temp: any[];
  chat: any[];
  images: any[];
  images_adm: any[];
  respostaData?: any;
  User?: any;
  solicitacaoData: any;
};

export const ChamadoRootComponent = ({ data, session }: ChamadoProps) => {
  const SaveChat = (chat: any) => {};

  return (
    <>
      <Flex
        w="full"
        h="full"
        bg="gray.500"
        p={4}
        gap={4}
        flexDir={{ base: "column", md: "row" }}
      >
        <Box
          display={"flex"}
          flexDir={"column"}
          w={{ base: "full", md: "70%" }}
          h={"full"}
          bg="white"
          borderRadius="1rem"
          boxShadow="md"
          border="1px solid"
          borderColor="gray.200"
          p={4}
          gap={4}
          justifyContent={"space-between"}
        >
          <Flex w="full" justifyContent="space-between" alignItems="center">
            <Flex gap={3} pl={8} alignItems="end" justifyContent="flex-start">
              <Heading>Chamado</Heading>
              {data?.id && <Heading size="lg">Id: {data?.id}</Heading>}
            </Flex>
            <Flex gap={2} pe={10}>
              {session?.role.adm ? (
                <>
                  {data?.status && (
                    <Flex>
                      <Heading size="lg">Status</Heading>
                      <Select value={data?.status || "ABERTO"} name="status">
                        <option value="ABERTO">Aberto</option>
                        <option value="EM_ANDAMENTO">Em andamento</option>
                        <option value="LV2">Enviado para nível 2</option>
                        <option value="CONCLUIDO">Concluído</option>
                      </Select>
                    </Flex>
                  )}
                </>
              ) : (
                <>
                  {data?.status && (
                    <Heading size="lg">Status: {data?.status}</Heading>
                  )}
                </>
              )}
            </Flex>
          </Flex>
          <Divider border={"1px solid"} borderColor="gray.300" my={4} />

          <Flex w="full" justifyContent="center">
                <Flex w={"90%"} gap={2} flexDir="column">
                  <FormLabel>Descrição do chamado</FormLabel>
                  <Textarea
                    placeholder="Descrição"
                    w="full"
                    h={"18rem"}
                    resize="none"
                    borderRadius="1rem"
                    border="1px solid"
                    borderColor="gray.300"
                    _hover={{ borderColor: "gray.300" }}
                    _focus={{ borderColor: "blue.500" }}
                  />
                </Flex>
              </Flex>
              {/* <Flex w="100%" h="25rem" justifyContent="center" gap={10}>
                <Flex w={"44%"} gap={2} h="100%" flexDir="column">
                  <FormLabel>Imagens</FormLabel>
                  <Flex
                    w={"100%"}
                    minH="150px"
                    border="2px dashed"
                    borderColor="gray.300"
                    borderRadius="lg"
                    p={4}
                    justifyContent="center"
                    alignItems="center"
                    flexDir="column"
                    gap={4}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    bg="gray.50"
                    _hover={{ borderColor: "blue.500", bg: "gray.100" }}
                    transition="all 0.2s"
                  >
                    <Icon as={FiUpload} w={8} h={8} color="gray.400" />
                    <Text color="gray.500" textAlign="center">
                      Arraste e solte suas imagens aqui ou
                    </Text>
                    <Text color="gray.400" fontSize="sm">
                      Limite: {images.length}/{MAX_IMAGES} imagens
                    </Text>
                    <Button
                      as="label"
                      htmlFor="file-upload"
                      colorScheme="blue"
                      isDisabled={images.length >= MAX_IMAGES}
                      cursor="pointer"
                    >
                      Selecione do computador
                      <Input
                        id="file-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileSelect}
                        display="none"
                      />
                    </Button>
                  </Flex>
      
                  {previews.length > 0 && (
                    <Grid
                      templateColumns="repeat(auto-fill, minmax(100px, 1fr))"
                      gap={4}
                      mt={4}
                      h="100%"
                    >
                      {previews.map((preview, index) => (
                        <Box key={index} position="relative">
                          <Image
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            borderRadius="md"
                            objectFit="cover"
                            w="80%"
                            h="80px"
                          />
                          <Button
                            position="absolute"
                            top={-2}
                            right={-2}
                            size="sm"
                            colorScheme="red"
                            borderRadius="full"
                            onClick={() => removeImage(index)}
                            p={0}
                            minW="20px"
                            h="20px"
                          >
                            <Icon as={FiX} w={3} h={3} />
                          </Button>
                        </Box>
                      ))}
                    </Grid>
                  )}
                </Flex>
      
                <Flex w={"44%"} gap={4} flexDir="column">
                  <Box>
                    <FormLabel>Departamento</FormLabel>
                    <Input
                      borderColor="gray.300"
                      placeholder="Departamento"
                      w={"100%"}
                    />
                  </Box>
                  <Box>
                    <FormLabel>Prioridade</FormLabel>
                    <Select
                      borderColor="gray.300"
                      placeholder="Prioridade"
                      w={"100%"}
                    >
                      <option value="baixa">Baixa</option>
                      <option value="media">Media</option>
                      <option value="alta">Alta</option>
                    </Select>
                  </Box>
                  <Flex gap={4}>
                    <Box>
                      <FormLabel>Data e hora do ocorrido</FormLabel>
                      <Input
                        borderColor="gray.300"
                        type="datetime-local"
                        placeholder="Data e hora do ocorrido"
                        w={"100%"}
                      />
                    </Box>
                    <Box>
                      <FormLabel>Id da solicitação</FormLabel>
                      <Input
                        borderColor="gray.300"
                        type="number"
                        placeholder="Id da solicitação"
                        w={"100%"}
                      />
                    </Box>
                  </Flex>
                </Flex>
              </Flex> */}
              <Flex w="full" justifyContent={"flex-end"}>
                <Button colorScheme="green">Salvar</Button>
              </Flex>
        </Box>

        <Flex
          w={{ base: "full", md: "30%" }}
          h={"full"}
          flexDir="column"
          gap={4}
        >
          <Box h={"65%"} w={"full"}>
            <MensagensChat
              id={data?.id || 0}
              data={data?.chat || []}
              session={session}
              onSend={SaveChat}
            />
          </Box>

          <Box h={"35%"} w={"full"}>
            <HistoricoComponent data={data?.temp || []} />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};
