import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import {
  CreateOptions,
  CreateVarient,
  CreateSelector,
  CreateFeatures,
  CreateSpectifction,
} from "@/lib/superbase/productvarient";
import {
  optionsFormSchema,
  OtpionsFormValue,
  varientFormSchema,
  VarientFormValue,
  SelectorFormSchema,
  SelectortFormValue,
  FeaturesFormSchema,
  FeaturestFormValue,
  SpecefictionFormSchema,
  SpecefictionFormValue,
} from "@/lib/validation/index";

export function useOptions() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<OtpionsFormValue>({
    resolver: zodResolver(optionsFormSchema),
    defaultValues: {
      name: "",
      value: [],
      product_id: "",
    },
  });

  const onSubmit = async (data: OtpionsFormValue) => {
    setIsSubmitting(true);
    // Convert form data to match the database model
    const { success, message } = await CreateOptions(
      data.name,
      data.product_id,
      data.value,
    );
    if (success) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("options added successfully!" + message);
      setIsSubmitting(false);
    }
  };
  return {
    form,
    isSubmitting,
    onSubmit,
  };
}

export function useVarient() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<VarientFormValue>({
    resolver: zodResolver(varientFormSchema),
    defaultValues: {
      title: "",
      price: 1,
      product_id: "",
      available_for_sale: true,
    },
  });

  const onSubmit = async (data: VarientFormValue) => {
    setIsSubmitting(true);
    // Convert form data to match the database model
    const { success, message } = await CreateVarient(
      data.title,
      data.product_id,
      data.price,
      data.available_for_sale,
    );
    if (success) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("options added successfully!" + message);
      setIsSubmitting(false);
    }
  };
  return {
    form,
    isSubmitting,
    onSubmit,
  };
}

export function useSelector() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SelectortFormValue>({
    resolver: zodResolver(SelectorFormSchema),
    defaultValues: {
      name: "",
      value: "",
      variant_id: "",
    },
  });

  const onSubmit = async (data: SelectortFormValue) => {
    setIsSubmitting(true);
    // Convert form data to match the database model
    const { success } = await CreateSelector(
      data.name,
      data.value,
      data.variant_id,
    );
    if (success) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("options added successfully!");
      setIsSubmitting(false);
    }
  };
  return {
    form,
    isSubmitting,
    onSubmit,
  };
}
export function useFeatures() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FeaturestFormValue>({
    resolver: zodResolver(FeaturesFormSchema),
    defaultValues: {
      product_id: "",
      name: "",
      value: [],
    },
  });

  const onSubmit = async (data: FeaturestFormValue) => {
    setIsSubmitting(true);
    // Convert form data to match the database model
    const { success } = await CreateFeatures(
      data.product_id,
      data.name,
      data.value,
    );
    if (success) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("features added successfully!");
      setIsSubmitting(false);
    }
  };
  return {
    form,
    isSubmitting,
    onSubmit,
  };
}
export function useSpecefiction() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SpecefictionFormValue>({
    resolver: zodResolver(SpecefictionFormSchema),
    defaultValues: {
      product_id: "",
      name: "",
      value: "",
    },
  });

  const onSubmit = async (data: SpecefictionFormValue) => {
    setIsSubmitting(true);
    // Convert form data to match the database model
    const { success } = await CreateSpectifction(
      data.product_id,
      data.name,
      data.value,
    );

    if (success) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("specefiction added successfully!");
      setIsSubmitting(false);
    }
  };
  return {
    form,
    isSubmitting,
    onSubmit,
  };
}
