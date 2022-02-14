import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom"
import { Repository } from "./repos";

export function Repo() {
   const params = useParams()
   const currentRepo = params['*'] as string;

   const queryClient = useQueryClient()

   async function handleChangeRepositoryDescription() {
      //chamada API para atualizar a descrição do repositório

      const previousRepos = queryClient.getQueryData<Repository[]>('repos') //nome da chave utilizada no 'useQuery<Repository[]>('repos'...'

      // com isso é possivel modificar sem que a lista precise ser recarregada do back
      if (previousRepos) {
         const nextRepos = previousRepos.map(repo => {
            if (repo.full_name === currentRepo) {
               return { ...repo, description: 'Testando' }
            } else {
               return repo;
            }
         })

         queryClient.setQueryData('repos', nextRepos)
      }

      //vai invalidar o tempo de cache adicionado
      // await queryClient.invalidateQueries(['repos'])
   }

   return (
      <div>
         <h1>{currentRepo}</h1>
         <button onClick={handleChangeRepositoryDescription}>Alterar</button>
      </div>
   )
}