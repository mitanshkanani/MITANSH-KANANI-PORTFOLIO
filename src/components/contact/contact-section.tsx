"use client";

import { useState, useRef, type FormEvent } from "react";
import { motion } from "motion/react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal, EASE } from "@/components/motion-primitives";
import { SectionLabel } from "@/components/projects/primitives";

/**
 * ContactSection — premium contact form.
 *
 * Submits to /api/contact (server-side Google Sheets integration).
 * Handles loading, success, and error states gracefully.
 */

type FormStatus = "idle" | "loading" | "success" | "error";

function InputField({
    id,
    label,
    type = "text",
    required = false,
    placeholder,
    value,
    onChange,
    error,
}: {
    id: string;
    label: string;
    type?: string;
    required?: boolean;
    placeholder?: string;
    value: string;
    onChange: (v: string) => void;
    error?: string;
}) {
    return (
        <div className="space-y-1.5">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-foreground"
            >
                {label}
                {required && (
                    <span className="ml-0.5 text-brand" aria-hidden>
                        *
                    </span>
                )}
            </label>
            <input
                id={id}
                name={id}
                type={type}
                required={required}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                aria-invalid={error ? "true" : undefined}
                aria-describedby={error ? `${id}-error` : undefined}
                className={cn(
                    "w-full rounded-lg border bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 backdrop-blur transition-colors duration-200",
                    "focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20",
                    error
                        ? "border-destructive"
                        : "border-border hover:border-foreground/20"
                )}
            />
            {error && (
                <p id={`${id}-error`} className="text-xs text-destructive" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}

export function ContactSection() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<FormStatus>("idle");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [serverMessage, setServerMessage] = useState("");
    const formRef = useRef<HTMLFormElement>(null);

    function validate(): boolean {
        const errs: Record<string, string> = {};
        if (!name.trim()) errs.name = "Name is required.";
        if (!email.trim()) {
            errs.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errs.email = "Enter a valid email address.";
        }
        if (!message.trim()) errs.message = "Message is required.";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!validate()) return;

        setStatus("loading");
        setServerMessage("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                setServerMessage(data.message || "Message sent successfully.");
                setName("");
                setEmail("");
                setMessage("");
                setErrors({});
            } else {
                setStatus("error");
                setServerMessage(
                    data.error || "Something went wrong. Please try again."
                );
            }
        } catch {
            setStatus("error");
            setServerMessage("Network error. Please try again later.");
        }
    }

    return (
        <section
            id="contact"
            aria-labelledby="contact-heading"
            className="relative py-20 sm:py-28"
        >
            {/* Background glow */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute left-1/2 bottom-0 h-[30rem] w-[50rem] max-w-full -translate-x-1/2 rounded-full bg-brand/6 blur-[120px]" />
            </div>


            <div className="mx-auto max-w-6xl px-5 sm:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Left: text */}
                    <div>
                        <Reveal className="flex flex-col gap-3">
                            <SectionLabel index="04">Contact</SectionLabel>
                            <h2
                                id="contact-heading"
                                className="max-w-lg font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
                            >
                                Let&apos;s build something together.
                            </h2>
                        </Reveal>

                        <Reveal delay={0.05}>
                            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                                Have a project idea, want to collaborate, or just want to
                                connect? Drop a message — I&apos;ll get back to you.
                            </p>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <div className="mt-8 space-y-3">
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <span className="inline-flex size-8 items-center justify-center rounded-lg border border-border bg-card/60 text-foreground/70">
                                        <Send className="size-3.5" />
                                    </span>
                                    <a
                                        href="mailto:mitanshkanani@outlook.com"
                                        className="transition-colors hover:text-foreground"
                                    >
                                        mitanshkanani@outlook.com
                                    </a>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* Right: form */}
                    <Reveal delay={0.1}>
                        <form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            noValidate
                            className="rounded-xl border border-border bg-card/60 p-6 backdrop-blur sm:p-8"
                        >
                            <div className="space-y-5">
                                <InputField
                                    id="contact-name"
                                    label="Name"
                                    required
                                    placeholder="Your name"
                                    value={name}
                                    onChange={setName}
                                    error={errors.name}
                                />
                                <InputField
                                    id="contact-email"
                                    label="Email"
                                    type="email"
                                    required
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={setEmail}
                                    error={errors.email}
                                />
                                <div className="space-y-1.5">
                                    <label
                                        htmlFor="contact-message"
                                        className="block text-sm font-medium text-foreground"
                                    >
                                        Message
                                        <span className="ml-0.5 text-brand" aria-hidden>
                                            *
                                        </span>
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        required
                                        rows={5}
                                        placeholder="What's on your mind?"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        aria-invalid={errors.message ? "true" : undefined}
                                        aria-describedby={
                                            errors.message ? "message-error" : undefined
                                        }
                                        className={cn(
                                            "w-full resize-none rounded-lg border bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 backdrop-blur transition-colors duration-200",
                                            "focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20",
                                            errors.message
                                                ? "border-destructive"
                                                : "border-border hover:border-foreground/20"
                                        )}
                                    />
                                    {errors.message && (
                                        <p
                                            id="message-error"
                                            className="text-xs text-destructive"
                                            role="alert"
                                        >
                                            {errors.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Submit button */}
                            <motion.button
                                type="submit"
                                disabled={status === "loading"}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.15, ease: EASE }}
                                className={cn(
                                    "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-colors",
                                    "bg-primary text-primary-foreground hover:bg-primary/90",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                                    "disabled:pointer-events-none disabled:opacity-60"
                                )}
                            >
                                {status === "loading" ? (
                                    <>
                                        <Loader2 className="size-4 animate-spin" />
                                        Sending…
                                    </>
                                ) : (
                                    <>
                                        <Send className="size-4" />
                                        Send message
                                    </>
                                )}
                            </motion.button>

                            {/* Status messages */}
                            {status === "success" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400"
                                    role="status"
                                >
                                    <CheckCircle2 className="size-4 shrink-0" />
                                    {serverMessage}
                                </motion.div>
                            )}

                            {status === "error" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                                    role="alert"
                                >
                                    <AlertCircle className="size-4 shrink-0" />
                                    {serverMessage}
                                </motion.div>
                            )}
                        </form>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
