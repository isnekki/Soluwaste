/**** PACKAGE IMPORTS ****/
"use client"
import { useEffect } from "react";

import Container from "@/components/Layout/Container";
import Image from "next/image";
import SelectionButton from "@/components/Elements/SelectionButton";

/**** IMAGE IMPORTS ****/
import Logo from '../assets/images/logo.png'
import Add from '../assets/svgs/add.svg'
import Graph from '../assets/svgs/scatter-plot.svg'
import Badge from '../assets/svgs/badge.svg'
import LogoIcon from '../assets/svgs/logo_icon.svg'

import { getRows } from "@/utilities/DatabaseManagement";

export default function Home() {

  useEffect(() => {
    (async () => {
      getRows({})
    })();
  }, [])

  return (
    <Container>
      <div className="flex grow flex-col h-full">
        <Image 
          src={Logo} 
          alt={"SoluWaste Logo"} 
          width={407}
          height={123}
        />
        <div id="selection_table_container" className="flex grow items-center justify-center">
          <SelectionButton 
            icon={Add} 
            iconAlt={"Input Icon"} 
            name={"INPUT DATA"} 
            href={"/input"} 
          />
          <SelectionButton 
            icon={Graph} 
            iconAlt={"Summary Icon"} 
            name={"OVERALL SUMMARY"} 
            href={"/summary"} 
          />
          <SelectionButton 
            icon={Badge}
            iconAlt={"Top Performing Barangays Icon"}
            name={"TOP PERFORMING BARANGAYS"}
            href={"/top-barangays"}
          />
          <SelectionButton 
            icon={LogoIcon}
            iconAlt={"About SoluWaste Icon"}
            name={"ABOUT SOLUWASTE"}
            href={"/about"}
          />
        </div>
        <footer className="flex py-5 justify-center opacity-60">
          <span>INSERT FOOTER CONTENT</span>
        </footer>
      </div>
    </Container>
  );
}
