type Props = {
  name: string;
};

export function HelloWorld({ name }: Props) {
  return <p>Hello {name}</p>;
}
