"use client";
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import {signUp} from "@/lib/actions";
import {useActionState, useEffect} from "react";
import {toast} from "sonner";
import {useFormStatus} from "react-dom";

export default function SignUpForm() {
    const initialState = {errorMessage:""};
    const [state, formAction] = useActionState(signUp, initialState);
    const {pending} = useFormStatus();
    const msg = state?.errorMessage;
    useEffect(() => {
        if(!state || !state.errorMessage) return;
        if(state.errorMessage.length){
            toast.error(state.errorMessage)
        }
    }, [state, msg])
    return (
        <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
            <form
                action={formAction}
                className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]">
                <div className="p-8 pb-6">
                    <div>
                        <Link
                            href="/public"
                            aria-label="go home">
                            <Icons.logo />
                        </Link>
                        <h1 className="text-title mb-1 mt-4 text-xl font-semibold">Create an Account</h1>
                        <p className="text-sm">Welcome! Create an account to get started</p>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <Button
                            type="button"
                            variant="outline">
                            <Icons.logo/>
                            <span>Google</span>
                        </Button>

                    </div>

                    <hr className="my-4 border-dashed" />

                    <div className="space-y-5">

                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="block text-sm">
                                Email
                            </Label>
                            <Input
                                type="email"
                                required
                                name="email"
                                id="email"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label
                                htmlFor="username"
                                className="block text-sm">
                                Username
                            </Label>
                            <Input
                                type="test"
                                required
                                name="username"
                                id="username"
                            />
                        </div>


                        <div className="space-y-2">
                            <Label
                                htmlFor="pwd"
                                className="text-title text-sm">
                                Password
                            </Label>
                            <Input
                                type="password"
                                required
                                name="pwd"
                                id="pwd"
                                className="input sz-md variant-mixed"
                            />
                        </div>

                        <Button className="w-full" disabled={pending}>Continue</Button>
                    </div>
                </div>

                <div className="bg-muted rounded-(--radius) border p-3">
                    <p className="text-accent-foreground text-center text-sm">
                        Have an account ?
                        <Button
                            asChild
                            variant="link"
                            className="px-2">
                            <Link href="/login">Sign In</Link>
                        </Button>
                    </p>
                </div>
            </form>
        </section>
    )
}