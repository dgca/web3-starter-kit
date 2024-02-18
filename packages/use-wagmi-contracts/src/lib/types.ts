import {
  Abi,
  AbiParameter,
  AbiParameterKind,
  AbiParametersToPrimitiveTypes,
  ExtractAbiFunction,
  ExtractAbiFunctions,
} from "abitype";
import {
  ContractFunctionArgs,
  ContractFunctionName,
  ReadContractReturnType,
  SimulateContractReturnType,
  WriteContractReturnType,
} from "viem";
import {
  UseReadContractParameters,
  UseAccountReturnType,
  UseReadContractReturnType,
  UseWalletClientReturnType,
  UsePublicClientReturnType,
  UseSimulateContractReturnType,
  UseSimulateContractParameters,
} from "wagmi";

export type WagmiArgs = {
  publicClient: UsePublicClientReturnType;
  walletClient: UseWalletClientReturnType;
  account: UseAccountReturnType;
};

export type AbiFunctionTypes<T extends Abi> = ExtractAbiFunctions<T>;
export type AbiFunctionMap<T extends Abi> = {
  [K in AbiFunctionTypes<T>["name"]]: Extract<AbiFunctionTypes<T>, { name: K }>;
};

export type ReadFn<
  TAbi extends Abi,
  TFunctionName extends ContractFunctionName<TAbi>,
> = {
  (
    ...args: AbiParamsToPrimitivesTuple<
      ExtractAbiFunction<TAbi, TFunctionName>["inputs"],
      "inputs"
    >
  ): Promise<ReadContractReturnType<TAbi, TFunctionName>>;
  useRead: (
    useReadParameters?: Omit<
      UseReadContractParameters<
        TAbi,
        TFunctionName,
        ContractFunctionArgs<TAbi, "pure" | "view">
      >,
      "abi" | "address" | "functionName"
    >,
  ) => UseReadContractReturnType<
    TAbi,
    TFunctionName,
    ContractFunctionArgs<TAbi, "pure" | "view">
  >;
};

export type WriteFn<
  TAbi extends Abi,
  TFunctionName extends ContractFunctionName<TAbi, "nonpayable" | "payable">,
> = {
  (
    ...args: AbiParamsToPrimitivesTuple<
      ExtractAbiFunction<TAbi, TFunctionName>["inputs"],
      "inputs"
    >
  ): Promise<
    [
      WriteContractReturnType,
      SimulateContractReturnType<TAbi, TFunctionName>["result"],
    ]
  >;
  useSimulateContract: (
    useWriteConfig?: UseSimulateContractParameters<
      TAbi,
      TFunctionName,
      ContractFunctionArgs<TAbi, "nonpayable" | "payable", TFunctionName>
    >,
  ) => UseSimulateContractReturnType<
    TAbi,
    TFunctionName,
    ContractFunctionArgs<TAbi, "nonpayable" | "payable", TFunctionName>
  >;
};

export type HandlersMap<TAbi extends Abi> = {
  [KFunctionName in ContractFunctionName<
    TAbi,
    "view" | "pure" | "nonpayable" | "payable"
  >]: AbiFunctionMap<TAbi>[KFunctionName]["stateMutability"] extends
    | "view"
    | "pure"
    ? ReadFn<TAbi, KFunctionName>
    : WriteFn<TAbi, KFunctionName>;
};

/**
 * Wraps AbiParametersToPrimitiveTypes for better tuple inference.
 */
export type AbiParamsToPrimitivesTuple<
  TAbiParameters extends readonly AbiParameter[],
  TAbiParameterKind extends AbiParameterKind = AbiParameterKind,
> =
  AbiParametersToPrimitiveTypes<
    TAbiParameters,
    TAbiParameterKind
  > extends Readonly<Array<unknown>>
    ? AbiParametersToPrimitiveTypes<TAbiParameters, TAbiParameterKind>
    : Array<unknown>;

export type AbiMapValue = {
  abi: Abi;
  defaultAddress?: string;
};

export type AbiMap = {
  [key: string]: AbiMapValue;
};

export type TypeChainFactory = {
  abi: Abi;
};

export type TypeChainObj = {
  [K: `${string}__factory`]: TypeChainFactory;
};

export type ContractToHandlersMap<T extends AbiMap> = {
  [K in keyof T]: T[K]["defaultAddress"] extends string
    ? (address?: string) => HandlersMap<T[K]["abi"]>
    : (address: string) => HandlersMap<T[K]["abi"]>;
};
