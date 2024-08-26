import z, { UnknownKeysParam, ZodRawShape } from "zod";

const baseSchema = {
  date: z.date({
    message: "Please enter a valid date",
  }),
  description: z.string().min(2, {
    message: "Please enter a valid description",
  }),
  amount: z.number().positive({
    message: "Please enter a valid amount",
  }),
  currency: z.string(z.enum(["USD", "MXN", "EUR", "GBP"])).min(1, {
    message: "Please select a valid currency",
  }),
  type: z.string(z.enum(["Income", "Expense", "Transfer"])).min(1, {
    message: "Please select a valid type",
  }),
};

const accountingCreateNUpdateSchema = z.object({
  ...baseSchema,
});

const admingAccountingCreateNUpdateSchema = z.object({
  ...baseSchema,
  user_id: z.string().min(1, {
    message: "Please select a valid user",
  }),
});

const schemas: { [key: string]: z.ZodObject<ZodRawShape, UnknownKeysParam> } = {
  create: accountingCreateNUpdateSchema,
  adminCreate: admingAccountingCreateNUpdateSchema,
  update: accountingCreateNUpdateSchema,
  adminUpdate: admingAccountingCreateNUpdateSchema,
};

export function validateAccounting(action: string, data: unknown) {
  const schema = schemas[action];

  if (!schema) {
    throw new Error("Invalid action");
  }

  const result = schema.safeParse(data);

  if (result.success) {
    return {};
  } else {
    const errors = result.error.errors.reduce(
      (acc: { [key: string]: string }, error) => {
        acc[error.path[0]] = error.message;
        return acc;
      },
      {}
    );
    return errors;
  }
}
