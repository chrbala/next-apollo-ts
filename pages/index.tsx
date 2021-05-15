import { useState } from 'react';
import { gql, useQuery } from '@apollo/client'
import { withApollo, getStaticApolloProps } from 'components/withApollo'
import Link from 'next/Link'

const QUERY = gql`
  query Weather {
    getCityByName(name: "Tokyo") {
      name
      weather {
        temperature {
          actual
          min
          max
        }
      }
    }
  }
`

function PostsPage() {
  const { data } = useQuery(QUERY)
  const [initalData] = useState(data)

  const result = data?.getCityByName
  if (!result) {
    return <div>Loading...</div>
  }
  return (
    <>
      <pre>{JSON.stringify(initalData, null, 2)}</pre>
      <Link href="/second">second</Link>
    </>
  )
}

export default withApollo({ ssr: false })(PostsPage)

export const getStaticProps = getStaticApolloProps(PostsPage, {
  revalidate: 10
})
