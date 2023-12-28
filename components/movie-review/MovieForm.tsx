"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast as shadcntoast } from "@/components/ui/use-toast";
import { Movie } from "@/models/movie";
import { triggerCustomTxSuccessToast } from "../TriggerCustomTxSuccessToast";

const MOVIE_REVIEW_PROGRAM_ID = "CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN";

const FormSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters." })
    .max(200),
  review: z
    .string()
    .min(3, { message: "Review must be at least 3 characters." }),
  rating: z
    .number()
    .min(1, { message: "Review must be at least 1." })
    .max(5, { message: "Review must be at most 5." }),
});

const MovieForm = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  // Define form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      review: "",
      rating: 1,
    },
  });

  // Define transaction handler
  const handleTxSubmit = async (movie: Movie) => {
    if (!publicKey) {
      shadcntoast({
        variant: "destructive",
        title: "Uh oh! It seems like your wallet is not connected.",
        description: "Try again after connecting your wallet.",
        // action: <ToastAction altText="Try again">Try again</ToastAction>,
      });

      return;
    }

    const buffer = movie.serialize();
    const transaction = new Transaction();

    // get all of the accounts that the transaction will read or write to (array of public keys)
    // pda is the address to the account where data will be stored
    const [pda] = await PublicKey.findProgramAddressSync(
      [publicKey.toBuffer(), new TextEncoder().encode(movie.title)],
      new PublicKey(MOVIE_REVIEW_PROGRAM_ID),
    );

    const instruction = new TransactionInstruction({
      keys: [
        {
          pubkey: publicKey,
          isSigner: true,
          isWritable: false,
        },
        {
          pubkey: pda,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: SystemProgram.programId,
          isSigner: false,
          isWritable: false,
        },
      ],
      data: buffer,
      programId: new PublicKey(MOVIE_REVIEW_PROGRAM_ID),
    });

    transaction.add(instruction);

    try {
      toast.loading("Sending transaction...");
      let signature = await sendTransaction(transaction, connection);
      toast.dismiss();
      triggerCustomTxSuccessToast(signature);
      console.log(`TX signature: ${signature}`);
    } catch (err) {
      toast.dismiss();
      toast.error(`Failed to send transaction: ${err}`);
      console.error("Failed to send transaction: ", err);
    }
  };

  // Define submit handler for the form
  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { title, review, rating } = data;
    const movie = new Movie(title, rating, review);

    handleTxSubmit(movie);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Movie Title</FormLabel>
              <FormControl>
                <Input placeholder="Top Gun Maverick" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="review"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your review here..."
                  className=""
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                What are your thoughts on this movie? Who are your favorite
                actors?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(event) => field.onChange(+event.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default MovieForm;
