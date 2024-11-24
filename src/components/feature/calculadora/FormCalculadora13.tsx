"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useForm, SubmitHandler } from "react-hook-form";


type Inputs = {
    paymentType: string;
    salaryGross: string;
    workMonths: string;
    dependentsNumber: string;
  }

export const FormCalculadora13 = () => {

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
      } = useForm<Inputs>()

      const onSubmit: SubmitHandler<Inputs> = (data) => {

        console.log('submited') 	
      }
    
      return (
        
        <div className="mx-auto mb-10 lg:mt-20 break-words prose-h1:text-4xl prose-h1:font-bold dark:prose-invert">
        
            <div className="max-w-4xl mx-auto py-6">
                <h1 className="mb-5">Calculadora de Décimo terceiro salário<br/> (Valor líquido CLT)</h1>
                <p className="text-lg text-gray-600 mb-16">Descubra quanto receberá de décimo terceiro esse ano e comece seus planos.</p>
            
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="salaryGross" className="block text-sm font-medium text-gray-700">
                        Salário bruto (*)
                        </label>
                        <Input
                            id="salaryGross"
                            placeholder="Entre com o salário bruto atual"
                            {...register("salaryGross", { required: "Salary is required" })}
                            error={errors.salaryGross?.message}
                            currency 
                        />
                    </div>

                    <div>
                        <label htmlFor="workMonths" className="block text-sm font-medium text-gray-700">
                        Meses trabalhados (*)
                        </label>
                        <Input
                            id="workMonths"
                            placeholder="Entre com o total de meses trabalhados até o momento"
                            {...register("workMonths", { required: "Salary is required" })}
                            error={errors.salaryGross?.message}
                            onlyNumbers
                        />                
                    </div>



                    <div>
                        <label htmlFor="dependentsNumber" className="block text-sm font-medium text-gray-700">
                        Número de dependentes (*)
                        </label>
                        <Input
                            id="dependentsNumber"
                            placeholder="Entre com o número de dependentes"
                            {...register("dependentsNumber", { required: "Salary is required" })}
                            error={errors.salaryGross?.message}
                            defaultValue={0}
                            onlyNumbers
                        />  
                    
                    </div>

                    <div>
                        <label htmlFor="paymentType" className="block text-sm font-medium text-gray-700">
                        Tipo de pagamento
                        </label>
                        <Select
                            id="paymentType"
                            options={[
                                { value: "unique", label: "Única", selected: true },
                                { value: "first", label: "Primeira" },
                                { value: "second", label: "Segunda" },
                                ]}
                            onChange={(value) => setValue("paymentType", value)}
                            />
                    </div>



                    <Button type="submit" className="w-full">
                        Calcular
                    </Button>
                </form>
            </div>
        </div>
        
      )
}