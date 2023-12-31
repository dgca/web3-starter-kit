import { ReactNode } from "react";

type Option =
  | string
  | {
      label: ReactNode;
      value: string;
    };

type Props = {
  options: Option[];
};

export function Dropdown({ options }: Props) {
  return (
    <details className="dropdown">
      <summary className="btn btn-sm m-1">TestTokens.sol</summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
        {options.map((option) => {
          const label = typeof option === "string" ? option : option.label;
          const value = typeof option === "string" ? option : option.value;
          return (
            <li key={value}>
              <a>{label}</a>
            </li>
          );
        })}
      </ul>
    </details>
  );
}
