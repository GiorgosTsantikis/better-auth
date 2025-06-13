"use client"

import * as React from "react"

import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail,} from "@/components/ui/sidebar"
import {Session} from "@/model/Session";
import {useJwt} from "@/hooks/use-jwt";
import {useEffect} from "react";
import {NavUser} from "@/components/nav-user";
import {useApi} from "@/hooks/use-api";


interface AppSidebarProps extends React.ComponentProps<typeof Sidebar>{
  session: Session;
}

export function AppSidebar({ ...props }: AppSidebarProps) {

  const {token, fetchJWT} = useJwt();

  useEffect(() => {
    if(!token)return;
    async function getFromBackend(){
      console.log(await fetch("http://localhost:8081/user/profile",{headers:{'Authorization':`Bearer ${token}`}}));
      console.log("hooker", await useApi<any>(process.env.NEXT_PUBLIC_BACKEND_PROFILE_ENDPOINT!, token!, fetchJWT, {
          method: 'GET',
      }))
    }
    getFromBackend()
  }, [token]);


  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
      </SidebarHeader>
      <SidebarContent>
        {/*<NavProjects projects={data.projects} />*/}
      </SidebarContent>
      <SidebarFooter>
        {<NavUser user={props.session.user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
