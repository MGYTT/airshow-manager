"use client";
import { useParams } from "next/navigation";
import { GamePage } from "../../page";
export default function SectionPage(){const params=useParams<{section:string}>();return <GamePage section={params.section||"centrum"}/>}
