export class CustomError extends Error {
   code: number;
   description: string;
   constructor(code: number, description: string) {
      super(description);
      this.name = "CustomError";
      this.code = code;
      this.description = description;
   }

   toJSON() {
      return {
         code: this.code,
         description: this.description,
      };
   }
}
