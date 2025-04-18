"use client";

import { Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FiFilePlus } from "react-icons/fi";

export default function BotaoNovaSolicita({ renderAsText = false }) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/solicitacoes");
  };

  if (renderAsText) {
    return (
      <Text
        color="white"
        fontSize="sm"
        cursor="pointer"
        display="flex"
        fontWeight={'light'}
        alignItems="center"
        onClick={handleClick}
      >
        <FiFilePlus style={{ marginRight: '8px' }} />
        NOVA SOLICITAÇÃO
      </Text>
    );
  }

  return (
    <Button
      textColor={"white"}
      variant="link"
      size="md"
      fontWeight={'light'}
      leftIcon={<FiFilePlus />}
      onClick={handleClick}
    >
      NOVA SOLICITAÇÃO
    </Button>
  );
}
