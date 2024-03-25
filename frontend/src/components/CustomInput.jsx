import React, { useState } from "react";
import { FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, Text, Icon } from "@chakra-ui/react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export default function CustomInput({ label, value, onChange, placeholder, error, type, required }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormControl mt="4">
      <FormLabel fontWeight="semibold">{label} {required && (<span style={{ color: "red" }} > * </span>)} </FormLabel>
      {type === "password" ? (
        <InputGroup size="md">
          <Input
            h="30px"
            border="1px"
            bg={error ? "red.100" : "primary.100"}
            p="7"
            fontWeight={"bold"}
            color="primary.500"
            borderColor={error ? "red" : "primary.300"}
            borderRadius="10px"
            value={value}
            onChange={onChange}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
          />
          <InputRightElement width="4.5rem">
            <Button
              bg="transparent"
              _active={{ backgroundColor: "transparent" }}
              color="primary.800"
              _hover={{ backgroundColor: "none" }}
              mt="4"
              onClick={handleTogglePassword}
            >
              <Icon as={showPassword ? IoMdEyeOff : IoMdEye} boxSize={8} />
            </Button>
          </InputRightElement>
        </InputGroup>
      ) : (
        <Input
          fontWeight={"bold"}
          color="primary.500"
          h="30px"
          border="1px"
          bg={error ? "red.100" : "primary.100"}
          p="7"
          borderColor={error ? "red" : "primary.300"}
          borderRadius="10px"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
      {error && <Text color="red" fontSize={"sm"} fontWeight={"medium"} >{error}</Text>}
    </FormControl>
  );
}
