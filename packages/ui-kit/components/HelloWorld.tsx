type Props = {
  name: string;
};

export function Thing({ name }: Props) {
  return <p>Hello {name}</p>;
}
