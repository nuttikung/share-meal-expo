import { StyleSheet, TextInput } from "react-native";
import z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThemedText } from "@/components/ThemedText";
import { ThemeTextInput } from "@/components/ThemeTextInput";
import { useRef } from "react";

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  label: {
    marginVertical: 3,
    marginHorizontal: 12,
  },
  input: {
    margin: 10,
  },
  text: {
    fontSize: 42,
    padding: 12,
  },
});

// ----------------------------------------------------------------------

const formSchema = z.object({
  name: z.string(),
  price: z.number(),
});

type OrderFormType = z.infer<typeof formSchema>;

// ----------------------------------------------------------------------

const defaultValues: OrderFormType = {
  name: "",
  price: 0,
};

type OrderFormProps = {
  order?: OrderFormType;
};

function OrderForm({ order }: OrderFormProps) {
  const nameRef = useRef<TextInput>(null);
  const priceRef = useRef<TextInput>(null);

  const form = useForm<OrderFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: order
      ? {
          name: order.name,
          price: order.price,
        }
      : defaultValues,
  });

  return (
    <>
      <ThemedText type="subtitle" style={styles.label}>
        ชื่อรายการ
      </ThemedText>
      <Controller
        control={form.control}
        name="name"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <ThemeTextInput
            style={styles.input}
            ref={nameRef}
            value={value}
            returnKeyType="next"
            placeholder="เช่น บุฟเฟ่ต์, หมูกระทะ, ชาเขียว, เบียร์ (โปร)"
            onChange={(event) => onChange(event.rawValue)}
            onSubmitEditing={() => priceRef.current?.focus()}
          />
        )}
      />
      <ThemedText type="subtitle" style={styles.label}>
        ราคา
      </ThemedText>
      <Controller
        control={form.control}
        name="price"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <ThemeTextInput
            ref={priceRef}
            value={String(value)}
            onChange={(event) => onChange(event.rawValue)}
            style={styles.input}
            returnKeyType="done"
            keyboardType="numeric"
            placeholder="เช่น 99, 100, 345, 500"
            submitBehavior="blurAndSubmit"
          />
        )}
      />
    </>
  );
}

export { OrderForm };
