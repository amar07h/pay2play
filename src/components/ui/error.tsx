import { FC } from "react";

interface error {
  messege: string | undefined;
}
export const Error: FC<error> = ({ messege }) => {
  return <div className="fixed left-1/2 top-2/4">{messege}</div>;
};
