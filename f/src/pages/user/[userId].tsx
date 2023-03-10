import React, { useState } from "react"
import { Box, Tab, Tabs, Typography } from "@mui/material"
import Image from "next/image"
import Collections from "../../components/Collections"
import localFont from "@next/font/local"
import CardsWrapper from "../../components/Cards"
import useTransitionHook from "../../hooks/useTransitionHook"
import { addApolloState, initializeApollo } from "../../tools/apolloClient"
import { UserRequest } from "../../gql/user.gql"
import { useQuery } from "@apollo/client"
import { useRouter } from "next/router"

const LogoFont = localFont({ src: "../../fonts/galey-r.ttf" })
const profileImage = "https://cdn.icon-icons.com/icons2/2406/PNG/512/user_account_icon_145918.png"

const UserId = () => {
  const router = useRouter()
  const { data } = useQuery<{ user: IUserData }>(UserRequest.getUserById, { variables: { userId: router.query.userId } })
  const { quizCards, collections } = data.user
  const [value, setValue] = useState<TabsValuesT>("collections")
  const { ref, styleTransition } = useTransitionHook({ delay: 1500 })
  const handleChange = (event: React.SyntheticEvent, newValue: TabsValuesT) => {
    setValue(newValue)
  }
  return (
    <Box width="800px" minHeight="90vh" p="50px 50px 50px" m="50px 0 0 0" borderRadius="10px" ref={ref} sx={styleTransition}>
      <Box display="flex" gap="25px" justifyContent="center" width="100%" mb="30px" sx={{ backgroundColor: "rgba(255, 255, 255, 1)", border: "2px solid #222222", boxShadow: "2px 2px 1px #222222" }}>
        <Image src={profileImage} alt="image" width="200" height="200" />
        <Box display="flex" flexDirection="column" justifyContent="space-between">
          <Typography pt="50px" style={LogoFont.style} fontWeight="600" fontSize="2rem">
            {data.user.username}
          </Typography>
          <Tabs value={value} onChange={handleChange} sx={{ pb: "25px" }} data-cy="profileTabs">
            <Tab value="collections" label="collections" data-cy="collections" />
            <Tab value="cards" label="cards" data-cy="cards" />
            <Tab value="three" label="<empty>" data-cy="empty" />
          </Tabs>
        </Box>
      </Box>
      {value === "collections" ? <Collections collections={collections} /> : value === "cards" ? <CardsWrapper quizCards={quizCards} /> : <>empty</>}
    </Box>
  )
}
export default UserId

export async function getServerSideProps({ resolvedUrl }) {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query({
    query: UserRequest.getUserById,
    variables: {
      userId: resolvedUrl.split("/").at(-1),
    },
  })
  return addApolloState(apolloClient, { props: {} })
}
