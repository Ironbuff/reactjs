import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { edithabit } from "../../services/ChangeHabits";
import { useNavigate, useParams } from "react-router-dom";
import { getHabits } from "../../services/GetHabits";
import { habitType } from "../habit/Habit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface HabitEditProps {
    title?: string;
    description?: string;
    completedDates?: string[];
    createdAt?: string;
    updatedAt?: string;
    user?: string;
    _id?: string;
}

const HabitEdit: React.FC<HabitEditProps> = () => {

  const { id }= useParams()
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    completedDates: [] as string[],
  });

    const { data:habits, isLoading:habitDataLoading, error } = useQuery({
    queryKey: ["habit"],
    queryFn: getHabits,
  });


  useEffect(() => {
   if (habits && id) {
    const habitData = habits?.data?.newhabit?.find(
      (item: habitType) => item._id === id
    );

    if (habitData) {
      setFormValues({
        title: habitData.title || "",
        description: habitData.description || "",
        completedDates: habitData.completedDates || [],
      });
    }
  }
  }, [habits]);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value,
    }));
  };


  const EditHabitMutation = useMutation({
    mutationKey:['editData'],
    mutationFn:edithabit,
    onSuccess:(res)=>{
        toast.success(res?.data?.message)
        navigate('/')
    },
    onError:(err:AxiosError<{message:string}>)=>{
      toast.error(err?.response?.data?.message || 'Something Went Wrong')
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    EditHabitMutation.mutateAsync({id, data:formValues})

  };

  return (<>
 
  <div className="flex flex-col gap-y-1  p-2 rounded-md shadow-md max-w-lg mx-auto mt-2">
    <h1 className="font-semibold text-xl text-black">Edit your Habit</h1>
  <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <div>
        <label className="block font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={formValues.title}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Description</label>
        <textarea
          name="description"
          value={formValues.description}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </form>
  </div>
  </>
    
  );
};

export default HabitEdit;
