import { Icons } from "@/components/icons";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Layout({children}:Readonly<{
    children:React.ReactNode}>){
    return (
        <div>
            <Button className={"fixed top-5 left-2"} variant={"outline"} asChild>
                <Link href={"/"}>
                    <Icons.arrowLeft className={"h-2 w-2"}/>
                    Back
                </Link>
            </Button>
            {children}
        </div>
    );
}