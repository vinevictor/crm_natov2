'use client';

import { CancelarAtendimento } from "@/actions/solicitacao/service/cancelarAtendimento";
import { IniciarAtendimento } from "@/actions/solicitacao/service/iniciarAtendimento";
import { Button, useToast } from "@chakra-ui/react";
import { useState } from "react";


interface BtnIniciarAtendimentoProps {
  hierarquia: string;
  status: boolean;
  aprovacao: string;
  id: number;
}

export default function BtnIniciarAtendimento({
  hierarquia,
  status: initialStatus,
  aprovacao,
  id,
}: BtnIniciarAtendimentoProps) {
  const [status, setStatus] = useState(initialStatus);
  console.log("🚀 ~ status:", status)
  const toast = useToast();

  const handleIniciarAtendimento = async () => {
    const req = await IniciarAtendimento(id);
    if (req.error) {
      toast({
        title: req.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    toast({
      title: req.message,
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top-right",
    });

    setStatus(true);
  };

  const handleCancelarAtendimento = async () => {
    const req = await CancelarAtendimento(id);
    if (req.error) {
      toast({
        title: req.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    toast({
      title: req.message,
      status: "warning",
      duration: 2000,
      isClosable: true,
      position: "top-right",
    });

    setStatus(false);
  };

  return (
    <>
      {(!["EMITIDO", "REVOGADO", "APROVADO"].includes(aprovacao) && hierarquia === "ADM") && (
        <>
          {status && (
            <Button size="sm" colorScheme="red" onClick={handleCancelarAtendimento}>
              Cancelar Atendimento
            </Button>
          )}
          {!status && (
            <Button size="sm" colorScheme="teal" onClick={handleIniciarAtendimento}>
              Iniciar Atendimento
            </Button>
          )}
        </>
      )}
    </>
  );
}