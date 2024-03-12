import Image from 'next/image'

import Container from "@/components/Layout/Container";

import Logo from '../../assets/images/logo.png'
import LogoWithVersion from '../../assets/images/logo_v.png'

export default function About() {
    return (
        <Container>
            <div id="about_container" className="flex flex-col h-full">
                <div className="flex flex-col items-center w-full">
                    <Image 
                        src={LogoWithVersion} 
                        alt={'Logo with Version'}
                        width={400}
                        height={400} 
                    />
                    <span className="m-10">
                        IN PARTNERSHIP WITH <strong>SAINT LOUIS UNIVERSITY</strong> AND <strong>GENERAL SERVICES OFFICE</strong>
                    </span>
                </div>
                <div id="content_container">
                    <div id="top_panel_container" className="flex flex-col grow">
                        <span className="flex flex-row font-anton italic text-5xl my-10">
                            WHAT IS SOLUWASTE?
                        </span>
                        <div className="flex flex-row justify-between">
                            <div id="left_panel_container" className="flex h-full w-2/5">
                                <div className="flex flex-col">
                                    <span className="text-2xl">
                                        SoluWaste is a Correlation-Based Application for analyzing waste management policies and produced waste weight across Baguio City's Barangays.
                                    </span>         
                                </div>                            
                            </div>
                            <div id="right_panel_container" className="flex flex-col w-1/2">
                                <span className="text-lg pb-5 max-w-2xl">
                                    Research in waste management is paramount due to the multifaceted impact of improper waste handling on environmental sustainability, public health, and economic stability. Inadequate waste disposal practices contribute significantly to environmental pollution, greenhouse gas emissions, and threats to ecosystems, while also posing health hazards to communities through contaminated water and air. Economically, inefficient waste management incurs substantial cleanup costs and hampers resource conservation efforts.
                                </span>
                                <span className="text-lg pt-5 max-w-2xl">
                                    Through research, we can develop and refine policies, innovative waste treatment techniques, and targeted behavioral interventions to optimize waste handling practices, promote responsible disposal behavior, and mitigate the environmental and societal challenges posed by escalating waste generation and technological advancements.
                                </span>               
                            </div>
                        </div>
                    </div>
                    <div id="bottom_panel_container" className="w-full mt-20 flex flex-col items-center bg-gray-200 rounded-xl">
                        <div className="flex flex-col max-w-5xl items-center p-10">
                            <span className="font-anton italic text-4xl pb-5">INFORMATION ABOUT THE STATISTICAL TOOL USED</span>
                            <span className="text-lg max-w-2xl">
                                Regression analysis is a statistical method used to examine the relationship between one or more independent variables (predictors) and a dependent variable (outcome). It helps in understanding how the value of the dependent variable changes when one or more independent variables are varied. There are different types of regression analysis, but the most common is linear regression, which assumes a linear relationship between the variables. The goal is to find the equation of a straight line (in the case of simple linear regression with one predictor) or a plane/hyperplane (in multiple linear regression with multiple predictors) that best fits the data points.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="flex flex-col py-20 pb-0 items-center">
                <Image 
                    src={LogoWithVersion}
                    alt={'Logo with Version'}
                    width={150}
                    height={150}
                />
                <span>RESEARCH EE 4161</span>
                <span>BS ELECTRICAL ENGINEERING</span>
                <span>2023-2024</span>
            </footer>
        </Container>
    )
}