import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import {UpdateAuth } from "@/lib/superbase/profiles";
import { SendOrder } from "@/lib/superbase/order";
import {Delay as Sleep} from "@/lib/common";
import { OrderFormSchema, OrderFormValue, ProfileFormSchema, ProfileFormValue } from "@/lib/validation/index";
import { useState } from "react";
import { user } from "@/lib/types/user";
export function UseProfileForm( ) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ProfileFormValue>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      email:"",
      full_name:"",
      phone:"",
      whatsapp:""
    },
  });

  const onSubmit = async (data: ProfileFormValue) => {
    setIsSubmitting(true);
    // Convert form data to match the database model
       const profileData: user = {
            full_name:data.full_name,
            email:data.email,
            whatsapp: data.whatsapp,
            phone: data.phone,
           
          };
    const success  = await UpdateAuth (profileData.phone,profileData.whatsapp);
     if (success) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("merci pour votre inscription!");
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
    }
  } 

  return {
    form,
    isSubmitting,
    onSubmit,
  };
}
export function SendOrders(email:string,full_name:string,phone:string,whatsapp:string,cart_id:string) {
       
  const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm<OrderFormValue>({
    resolver: zodResolver(OrderFormSchema),
    defaultValues: {
             fullname:full_name,
             phone:phone,
             email:email,
             whatsapp:whatsapp,
             cart_id:cart_id,
    },
  }); 
const onSubmit = async () => {
    setIsSubmitting(true);
   const { success } = await SendOrder(full_name,phone,email,whatsapp,cart_id);
    if (success) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("votre ordre est bien recu!");
      Sleep(2000)
      setIsSubmitting(false);
      document.location.href="/"
    } else {
      
     toast.success("order failed!");
      setIsSubmitting(false);
    }
  } 
  return {   
     form,
    isSubmitting,
    onSubmit,
  };
} 