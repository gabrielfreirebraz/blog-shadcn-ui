"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";


type Inputs = {
    salaryGross: string
  }

export const FormCalculadora13 = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<Inputs>()

      const onSubmit: SubmitHandler<Inputs> = (data) => {

        console.log('submited') 	
        console.log(data)
      }
    
      console.log(watch("salaryGross")) // watch input value by passing the name of it
    
      return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="salaryGross" className="block text-sm font-medium text-gray-700">
                Salário bruto
                </label>
                <Input
                    id="salaryGross"
                    placeholder="Entre com o salário bruto atual"
                    register={register}
                    error={errors.salaryGross?.message}
                    requiredMessage="Required"
                />
            </div>

            <div>
                <label htmlFor="salaryGross" className="block text-sm font-medium text-gray-700">
                Meses trabalhados
                </label>
                <Input
                    id="workMonths"
                    placeholder="Entre com o total de meses trabalhados até o momento"
                    register={register}
                    error={errors.salaryGross?.message}
                    requiredMessage="Required"
                />
            </div>

            <div>
                <label htmlFor="salaryGross" className="block text-sm font-medium text-gray-700">
                Tipo de pagamento
                </label>
                <Input
                    id="paymentType"
                    placeholder="Entre com o tipo de pagamento"
                    register={register}
                    error={errors.salaryGross?.message}
                    requiredMessage="Required"
                />
            </div>

            <div>
                <label htmlFor="salaryGross" className="block text-sm font-medium text-gray-700">
                Número de dependentes
                </label>
                <Input
                    id="dependentsNumber"
                    placeholder="Entre com o número de dependentes"
                    register={register}
                    error={errors.salaryGross?.message}
                    requiredMessage="Required"
                />
            </div>



            <Button type="submit" className="w-full">
                Calcular
            </Button>
        </form>
      )
}