export type ErrorResponse = {
  data: {
    errors: {
      name?: string;
      message?: string;
      description?: string;
    };
    status: number;
  };
  status: number;
};
