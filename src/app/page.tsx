'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {
  const { data: session } = authClient.useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmit = async () => {
    console.log(email, password, name);
    authClient.signUp.email({
      email,
      name,
      password
    }, {
      onError: (error) => {
        window.alert("Error: " + "something went wrong");
      },
      onSuccess: () => {
        window.alert("Success");
      }
    })
  }
  if (session) {
    return (
      <>
        <div className="flex flex-col gap-y-4 p-4">
          <p>Logged in as {session.user?.name}</p>
          <Button onClick={() => authClient.signOut()}>Sign out</Button>
        </div>

      </>
    )
  }
  return (
    <>
      <div className="flex flex-col gap-y-4 p-10">
        <div className="flex flex-col gap-y-4 p-4">
          <Input placeholder="Name" onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={onSubmit}>Submit</Button>
        </div>
      </div>
    </>
  );
}
