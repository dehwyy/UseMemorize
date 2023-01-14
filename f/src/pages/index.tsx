import React from "react"
import { Box, Slide, Typography } from "@mui/material"
import { useInView } from "react-intersection-observer"
import localFont from "@next/font/local"
import Image from "next/image"

const LogoFont = localFont({ src: "../fonts/galey-r.ttf" })
const LogoFont2 = localFont({ src: "../fonts/aquire.otf" })
const Index = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    delay: 1500,
    trackVisibility: true,
  })
  const { ref: ref2, inView: inView2 } = useInView({
    triggerOnce: true,
  })
  const styleTransition = prop => ({ transition: "1s ease", transform: prop ? "translateY(0)" : "translateY(25px)", opacity: inView ? "1" : "0" })
  return (
    <Box mt="50px" p="50px 0 0" borderRadius="10px 10px 0 0">
      <Box ref={ref} sx={styleTransition(inView)} pb="50px">
        <Box textAlign="center">
          <Typography style={LogoFont2.style} fontSize="3.2rem" fontWeight="600" sx={{ color: "secondary.contrastText" }}>
            UseMemorize
          </Typography>
          <Typography fontSize="1rem" fontWeight="600" style={LogoFont.style} sx={{ color: "primary.contrastText" }} pb="10px">
            Complete solution for memorizing any information
          </Typography>
          <Image width={400} height={400} alt="preview" src={"https://sun1-83.userapi.com/impg/-YEwOep1yOHZmV6F3-Z8XC_HP2GDiOoEP6XekA/_OTpcMMEyNI.jpg?size=828x807&quality=95&sign=89373c2f858271c65aae3d19fd2beb59&type=album"} />
        </Box>
      </Box>
      <Box ref={ref2} sx={styleTransition(inView2)}>
        <Box textAlign="center">
          <Typography style={LogoFont.style} fontSize="3rem" fontWeight="600" sx={{ color: "secondary.contrastText" }}>
            Inspiration
          </Typography>
          <Typography fontSize="1rem" fontWeight="600" style={LogoFont.style} sx={{ color: "primary.contrastText" }}>
            App was created mainly for me
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Index
