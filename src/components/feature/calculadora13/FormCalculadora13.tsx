"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useForm, SubmitHandler } from "react-hook-form";
import { calculateDecimoTerceiro } from "./utils/calculateDecimoTerceiro";
import Markdown from "react-markdown";
import { text } from "./utils/text";
import { useState } from "react";
import { formatToBRL } from "./utils/formatToBRL";


export const FormCalculadora13 = () => {
    const [result, setResult] = useState<DecimoTerceiroResult>();


    const {
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
        formState: { errors },
      } = useForm<DecimoTerceiroInputs>({
        defaultValues: {
            paymentType: 'unique',
            dependentsNumber: 0
        },
      })

      const onSubmit: SubmitHandler<DecimoTerceiroInputs> = (data) => {

        setResult(() => calculateDecimoTerceiro(data) );
      }
    
      return (
        
        <div className="mx-auto mb-10 lg:mt-20 break-words prose-h1:text-4xl prose-h1:font-bold dark:prose-invert">
        
            <div className="max-w-4xl mx-auto py-6">
                <h1 className="mb-5">Calculadora de Décimo terceiro salário<br/> (Valor líquido CLT)</h1>
                <p className="text-lg text-gray-600 mb-16">Descubra quanto receberá de décimo terceiro esse ano e comece seus planos.</p>
            
                <div className="flex flex-column">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
                        <div>
                            <label htmlFor="salaryGross" className="block text-sm font-medium text-gray-700">
                            Salário bruto (*)
                            </label>
                            <Input
                                id="salaryGross"
                                placeholder="Entre com o salário bruto atual"
                                {...register("salaryGross")}
                                onValueChange={(value) => setValue("salaryGross", Number(value))}
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
                                {...register("workMonths")}
                                onValueChange={(value) => setValue("workMonths", Number(value))}
                                onlyNumbers
                            />                
                        </div>

                        <div>
                            <label htmlFor="dependentsNumber" className="block text-sm font-medium text-gray-700">
                            Número de dependentes
                            </label>
                            <Input
                                id="dependentsNumber"
                                placeholder="Entre com o número de dependentes"
                                {...register("dependentsNumber")}
                                onValueChange={(value) => setValue("dependentsNumber", Number(value))}
                                defaultValue={0}
                                onlyNumbers
                            />  
                        
                        </div>

                        <div>
                            <label htmlFor="paymentType" className="block text-sm font-medium text-gray-700">
                            Tipo de pagamento
                            </label>
                            <Select
                                {...register("paymentType")}
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


                    <div className="">
                        {result && <>
                            {getValues('paymentType') === 'unique' && <p className="text-lg text-gray-600 px-8">
                                Valor líquido a receber até <b>20 de dezembro</b> em <b>parcela única</b>: <br/>
                                <strong className="text-4xl">{formatToBRL(result.totalLiquido)}</strong>.
                            </p>}

                            {getValues('paymentType') === 'first' && <p className="text-lg text-gray-600 px-8">
                                Valor líquido a receber até <b>30 de novembro</b> da <b>primeira parcela</b>: <br/>
                                <strong className="text-4xl">{formatToBRL(result.primeiraParcela)}</strong>.
                            </p>}

                            {getValues('paymentType') === 'second' && <p className="text-lg text-gray-600 px-8">
                                Valor líquido a receber até <b>20 de dezembro</b> da <b>segunda parcela</b>: <br/>
                                <strong className="text-4xl">{formatToBRL(result.segundaParcela)}</strong>.
                            </p>}

                            

                            {getValues('paymentType') === 'unique' && <p className="text-lg text-gray-600 px-8 py-8">
                                Valor bruto: <br/> 
                                <strong className="text-2xl">{formatToBRL(result.totalBruto)}</strong>
                            </p>}

                            {getValues('paymentType') === 'first' && <p className="text-lg text-gray-600 px-8 py-8">
                                Valor bruto: <br/> 
                                <strong className="text-2xl">{formatToBRL(result.primeiraParcela)}</strong>
                            </p>}

                            {getValues('paymentType') === 'second' && <p className="text-lg text-gray-600 px-8 py-8">
                                Valor bruto: <br/> 
                                <strong className="text-2xl">{formatToBRL(result.primeiraParcela)}</strong>
                            </p>}



                            <p className="text-lg text-gray-600 px-8">
                                Total de impostos:<br/> 
                                <strong className="text-2xl">{formatToBRL(result.descontosTotais)}</strong>
                                <br/><br/>
                                • <strong>INSS:</strong> {formatToBRL(result.inss)} - {result.inssPercent}% Ref.
                                <br/>
                                • <strong>IRRF:</strong> {formatToBRL(result.ir)} - {result.irPercent}% Ref.
                            </p></>}
                    </div>
                </div>

                <div className="prose md:prose-md dark:prose-invert m-auto mt-20 mb-10">
                    <Markdown>{text}</Markdown>      
                </div>
            </div>
        </div>
        
      )
}