"use client";
import { useParams } from "next/navigation";
import GamePage from "../../../components/GamePage";
export default function SectionPage(){const params=useParams<{section:string}>();return <GamePage section={params.section||"centrum"}/>}
