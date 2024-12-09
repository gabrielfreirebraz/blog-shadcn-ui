"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputDate } from "@/components/ui/input-date";
import { Select } from "@/components/ui/select";
import { useForm, SubmitHandler } from "react-hook-form";
import Markdown from "react-markdown";
import { text } from "./utils/description";
import { useState } from "react";
import { formatToBRL } from "@/utils/formatToBRL";
import { calculateRescisao } from "./useCases/calculateRescisao";


export const FormCalculadoraRescisao = () => {
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
            reasonType: 'no_just_cause',
            noticePeriod: 'worked',
            dependentsNumber: 0
        },
      })

      const onSubmit: SubmitHandler<DecimoTerceiroInputs> = (data) => {

        setResult(() => calculateRescisao(data) );
      }
    
      return (
        
        <div className="mx-auto mb-10 lg:mt-20 break-words prose-h1:text-4xl prose-h1:font-bold dark:prose-invert">
        
            <div className="max-w-4xl mx-auto py-6">
                <h1 className="mb-5">Calculadora de Rescisão<br/> (Valor líquido CLT)</h1>
                <p className="text-lg text-gray-600 mb-16">Descubra quanto receberá de rescisão e comece seus novos planos.</p>
            
                <div className="flex flex-col md:flex-row">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
                        <div>
                            <label htmlFor="salaryGross" className="block text-sm font-medium text-gray-700">
                            Salário bruto (*)
                            </label>
                            <Input
                                id="salaryGross"
                                placeholder="Entre com o salário bruto atual"
                                {...register("salaryGross", { required: 'O salário bruto é obrigatório' })}
                                onValueChange={(value) => setValue("salaryGross", Number(value))}
                                error={errors.salaryGross?.message ?? null}
                                currency 
                            />
                        </div>

                        <div>
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                            Data de admissão / contratação (*)
                            </label>
                            <InputDate
                                id="startDate"
                                {...register("startDate")}
                                onChange={(value) => setValue("startDate", (value))}
                                max="2024-12-08" // date now
                                required
                                placeholder="Selecione a data de início"
                            />
                        </div>

                        <div>
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                            Data de afastamento / demissão (*)
                            </label>
                            <InputDate
                                id="endDate"
                                {...register("endDate")}
                                onChange={(value) => setValue("endDate", (value))}
                                min="2024-12-08" // date now
                                required
                                placeholder="Selecione a data de término"
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
                            <label htmlFor="reasonType" className="block text-sm font-medium text-gray-700">
                            Motivo (*)
                            </label>
                            <Select
                                {...register("reasonType")}
                                id="reasonType"
                                options={[
                                    { value: "common_agreement", label: "Demissão de comum acordo" },
                                    { value: "no_just_cause", label: "Dispensa sem justa causa", selected: true },
                                    { value: "with_just_cause", label: "Dispensa com justa causa" },
                                    { value: "resignation", label: "Pedido de demissão" },
                                    { value: "end_contract_on_time", label: "Encerramento de contrato de experiência no prazo" },
                                    { value: "end_contract_before_time", label: "Encerramento de contrato de experiência antes prazo" }
                                    ]}
                                onChange={(value) => setValue("reasonType", value)}
                                />
                        </div>

                        <div>
                            <label htmlFor="noticePeriod" className="block text-sm font-medium text-gray-700">
                            Aviso Prévio (*)
                            </label>
                            <Select
                                {...register("noticePeriod")}
                                id="noticePeriod"
                                options={[
                                    { value: "worked", label: "Trabalhado", selected: true },
                                    { value: "compensated_by_employer", label: "Indenizado pelo empregador" },
                                    { value: "not_fulfilled_by_employee", label: "Não cumprido pelo empregado" },
                                    { value: "dismissed", label: "Dispensado" }
                                    ]}
                                onChange={(value) => setValue("noticePeriod", value)}
                                />
                        </div>

                        <Button type="submit" className="w-full">
                            Calcular
                        </Button>
                    </form>

                    <div className="md:my-auto mt-16 mb-10 w-full max-w-md">
                        {result && <>
                            {/* {getValues('paymentType') === 'unique' && <p className="text-lg text-gray-600 px-8">
                                Valor líquido a receber até <b>30 de novembro</b> em <b>parcela única</b>: <br/>
                                <strong className="text-4xl leading-relaxed">{formatToBRL(result.totalLiquido)}</strong>.
                            </p>}

                            {getValues('paymentType') === 'first' && <p className="text-lg text-gray-600 px-8">
                                Valor líquido a receber até <b>30 de novembro</b> da <b>primeira parcela</b>: <br/>
                                <strong className="text-4xl leading-relaxed">{formatToBRL(result.primeiraParcela)}</strong>.
                            </p>}

                            {getValues('paymentType') === 'second' && <p className="text-lg text-gray-600 px-8">
                                Valor líquido a receber até <b>20 de dezembro</b> da <b>segunda parcela</b>: <br/>
                                <strong className="text-4xl leading-relaxed">{formatToBRL(result.segundaParcela)}</strong>.
                            </p>}
                            

                            {getValues('paymentType') === 'unique' && <p className="text-lg text-gray-600 px-8 py-6">
                                Valor bruto: <br/> 
                                <strong className="text-2xl">{formatToBRL(result.totalBruto)}</strong>
                            </p>}

                            {getValues('paymentType') === 'first' && <p className="text-lg text-gray-600 px-8 py-6">
                                Valor bruto: <br/> 
                                <strong className="text-2xl">{formatToBRL(result.primeiraParcela)}</strong>
                            </p>}

                            {getValues('paymentType') === 'second' && <p className="text-lg text-gray-600 px-8 py-6">
                                Valor bruto: <br/> 
                                <strong className="text-2xl">{formatToBRL(result.primeiraParcela)}</strong>
                            </p>} */}


                            {getValues('reasonType') === 'first' ? 
                                <p className="text-lg text-gray-600 px-8">
                                    Total de impostos:<br/> 
                                    <strong className="text-2xl">{formatToBRL(0)}</strong>
                                    <br/><br/>
                                    • <strong>INSS:</strong> {`-`}
                                    <br/>
                                    • <strong>IRRF:</strong> {`-`}
                                </p>
                                : 
                                <p className="text-lg text-gray-600 px-8">
                                    Total de impostos:<br/> 
                                    <strong className="text-2xl">{formatToBRL(result.descontosTotais)}</strong>
                                    <br/><br/>
                                    • <strong>INSS:</strong> {formatToBRL(result.inss)} - {result.inssPercent}% Ref.
                                    <br/>
                                    • <strong>IRRF:</strong> {formatToBRL(result.ir)} - {result.irPercent}% Ref.
                                </p>}
                            </>}
                    </div>
                </div>

                <div className="prose md:prose-md dark:prose-invert m-auto mt-20 mb-10">
                    <Markdown>{text}</Markdown>      
                </div>
            </div>
        </div>
        
      )
}