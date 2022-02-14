// import { useFetch } from "./hooks/useFetch";
import axios from 'axios';
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom';

export type Repository = {
   full_name: string;
   description: string;
}

export function Repos() {
   // const { data: repositories, isFetching } = useFetch<Repository[]>('users/StealthWorm/repos');
   // primeiro param é como se fosse o id da chamada, uma maneira facil de assosciar 

   // useQuery tem uma função que revalida ao dar foco, o que atualiza em tempo real os dados consumidos sem atulizar a aba
   // ver a documentação do React Query para lidar com paginação, a chave 'repos' nao poderia ser unica, deveria ser uma chave multipla com o valor da pagina
   const { data, isFetching } = useQuery<Repository[]>('repos', async () => {
      const response = await axios.get('https://api.github.com/users/StealthWorm/repos');

      return response.data;
   }, {
      // refetchOnWindowFocus: false,
      staleTime: 1000 * 60, // 1min
   })

   return (
      <ul>
         {isFetching && <p>Carregando...</p>}
         {data?.map(repo => {
            return (
               <li key={repo.full_name}>
                  <Link to={`repos/${repo.full_name}`}>
                     {repo.full_name}
                  </Link>
                  <p>{repo.description}</p>
               </li>
            )
         })}
      </ul>
   )
}
