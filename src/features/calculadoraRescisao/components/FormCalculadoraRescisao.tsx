"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputDate } from "@/components/ui/input-date";
import { Select } from "@/components/ui/select";
import { useForm, SubmitHandler } from "react-hook-form";
import Markdown from "react-markdown";
import { text } from "../utils/description";
import { useState } from "react";
import { formatToBRL } from "@/utils/formatToBRL";
import { calculateRescisao } from "../useCases/calculateRescisao";
import { NoticeType, TerminationType } from "@/features/calculadoraRescisao/enum/TerminationType";
import { RescisaoInputs, RescisaoResult } from "../types";
import { showCurrentDate } from "../utils/currDate";
import { TerminationNetMessage } from "./TerminationNetMessage";


export const FormCalculadoraRescisao = () => {
    const [result, setResult] = useState<RescisaoResult>();


    const {
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<RescisaoInputs>({
        defaultValues: {
            reasonType: TerminationType.NO_JUST_CAUSE,
            noticeType: NoticeType.WORKED,
            dependentsNumber: 0
        },
    })

    const onSubmit: SubmitHandler<RescisaoInputs> = (data) => {

        console.log('aqui', data)
        setResult(() => calculateRescisao(data));
    }

    return (

        <div className="mx-auto mb-10 lg:mt-20 break-words prose-h1:text-4xl prose-h1:font-bold dark:prose-invert">

            <div className="max-w-4xl mx-auto py-6">
                <h1 className="mb-5">Calculadora de Rescisão<br /> (Valor líquido CLT)</h1>
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
                                onChange={(e) => setValue("startDate", (e.target.value))}
                                max={`${showCurrentDate()}`}
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
                                onChange={(e) => setValue("endDate", (e.target.value))}
                                // min={`${showCurrentDate()}`}
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
                                    { value: TerminationType.COMMON_AGREEMENT, label: "Demissão de comum acordo" },
                                    { value: TerminationType.NO_JUST_CAUSE, label: "Dispensa sem justa causa", selected: true },
                                    { value: TerminationType.WITH_JUST_CAUSE, label: "Dispensa com justa causa" },
                                    { value: TerminationType.RESIGNATION, label: "Pedido de demissão" },
                                    { value: TerminationType.END_CONTRACT_ON_TIME, label: "Encerramento de contrato de experiência no prazo" },
                                    { value: TerminationType.END_CONTRACT_BEFORE_TIME, label: "Encerramento de contrato de experiência antes prazo" }
                                ]}
                                onChange={(value) => setValue("reasonType", value as TerminationType)}
                            />
                        </div>

                        <div>
                            <label htmlFor="noticeType" className="block text-sm font-medium text-gray-700">
                                Aviso Prévio (*)
                            </label>
                            <Select
                                {...register("noticeType")}
                                id="noticeType"
                                options={[
                                    { value: NoticeType.WORKED, label: "Trabalhado", selected: true },
                                    { value: NoticeType.COMPENSATED_BY_EMPLOYER, label: "Indenizado pelo empregador" },
                                    { value: NoticeType.NOT_FULFILLED_BY_EMPLOYEE, label: "Não cumprido pelo empregado" },
                                    { value: NoticeType.DISMISSED, label: "Dispensado" }
                                ]}
                                onChange={(value) => setValue("noticeType", value)}
                            />
                        </div>

                        <Button type="submit" className="w-full">
                            Calcular
                        </Button>
                    </form>

                    <div className="md:my-auto mt-16 mb-10 w-full max-w-md">
                        {result && <>

                            <TerminationNetMessage
                                terminationType={getValues('reasonType') as TerminationType}
                                noticeType={getValues('noticeType') as NoticeType}
                                netTotal={result.netTotal} />

                            {<p className="text-lg text-gray-600 px-8 py-6">
                                Valor bruto a receber: <br />
                                <strong className="text-2xl">{formatToBRL(result.grossTotal)}</strong>
                            </p>}

                            <p className="text-lg text-gray-600 px-8">
                                Total de impostos e descontos:<br />
                                <strong className="text-2xl">{formatToBRL(result.deductionsTotal)}</strong>
                                <br /><br />
                                • <strong>INSS:</strong> {formatToBRL(result.inss)} - {result.inssPercent}% Ref.
                                <br />
                                • <strong>IRRF:</strong> {formatToBRL(result.ir)} - {result.irPercent}% Ref.
                                <br /><br />
                                • <strong>Saldo de Salário:</strong> {`${result.salaryBalance}`}
                                <br />
                                • <strong>13º Salário Proporcional:</strong> ${result.proportionalThirteenthSalary}
                                <br />
                                • <strong>Férias (Proporcionais + 13º):</strong> {`${result.proportionalVacation}`}
                                <br />
                                • <strong>Aviso Prévio:</strong> {`${result.priorNotice}`}
                                <br />
                                • <strong>Multa de 40% FGTS:</strong> {`${result.fgtsFine}`}

                            </p>
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