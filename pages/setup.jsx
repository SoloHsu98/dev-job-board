import Layout from "@/components/Layout";
import { Card, TextInput, Title, Button } from "@tremor/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
export default function Setup() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { data: session } = useSession();
  const onSubmit = async (data) => {
    setLoading(true);
    await axios.post("/api/setup", { ...data, userId: session.user.id });
    session.user.name = data.name;
    session.user.isCompany = data.isCompany;
    router.push("/");
    setLoading(false);
  };
  return (
    <Layout>
      <Card className="max-w-md mx-auto">
        <Title>Setup Your Profile</Title>
        <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            {...register("name", {
              required: true,
            })}
            className="mt-1"
            placeholder="Add Your Name"
            error={errors.name}
          ></TextInput>
          <div className="mt-4">
            <label htmlFor="isCompany">Are you a company?</label>
          </div>
          <input
            type="checkbox"
            name=""
            id="isCompany"
            className="block p-1 mt-1"
            {...register("isCompany")}
          />
          <Button
            loading={loading}
            type="submit"
            className="mt-4"
            color="green"
          >
            Save
          </Button>
        </form>
      </Card>
    </Layout>
  );
}
