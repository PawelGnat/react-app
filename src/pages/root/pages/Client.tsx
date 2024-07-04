import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

// import useClients from "../../../hooks/useClients";

// interface ClientPageProps {
//   id: string;
// }

// const ClientPage: FC<ClientPageProps> = () => {

const ClientPage = () => {
  const { clientId } = useParams();

  console.log(clientId);

  return (
    <div>
      <h1>Client</h1>
    </div>
  );
};

export default ClientPage;
