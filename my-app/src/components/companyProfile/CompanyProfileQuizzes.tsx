import React, {useCallback, useEffect, useState} from 'react';
import Button from "../../utils/Button";
import {
    AllActionCompaniesState,
    AllQuizForListState, CompanyItemProps, initialAllActionCompaniesState,
    initialAllQuizForListState, QuizForListState
} from "../../types";
import {
    deleteQuizThunk,
    getLastAnswersCsvFoeQuizInCompanyThunk,
    getQuizListThunk,
    myCompanyListThunk
} from "../../store/reduxThunk";
import CreateQuizModal from "../modalWindows/CreateQuizModal";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import EditQuizModal from "../modalWindows/EditQuizModal";
import {useNavigate} from "react-router-dom";
import QuestionRows from "./questionRows";

const CompanyProfileQuizzes = ({companyData}: CompanyItemProps) => {
    const currentUser = useSelector((state: RootState) => state.currentUser);
    const [quizzesList, setQuizzesList] = useState<AllQuizForListState>(initialAllQuizForListState)
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [companyList, setCompanyList] = useState<AllActionCompaniesState>(initialAllActionCompaniesState)
    const [modalData, setModalData] = useState(0);

    useEffect(() => {
        myCompanyListThunk(currentUser.user_id)
            .then((res) => {
                setCompanyList(res?.result)
            })
    }, [companyList.companies.length, currentUser.user_id])

    const updateQuizList = useCallback(() => {
        getQuizListThunk(companyData.company_id)
            .then((res) => {
                if (res){
                    setQuizzesList(res?.result);
                }
            });
    }, [companyData.company_id]);

    useEffect(() => {
        updateQuizList();
    }, [quizzesList.quizzes.length, updateQuizList]);


    const onClickCreateQuiz = () => {
        setIsOpen(!isOpen);
    }

    const onClickEditQuiz = (quiz_id: number) => {
        setModalData(quiz_id)
        setIsOpenEdit(!isOpenEdit);
    }

    const onClickDelete = (quiz_id: number) => {
        deleteQuizThunk(quiz_id)
            .then(() => updateQuizList())
    }

    function isAdmin(companyList: AllActionCompaniesState, companyId: number): boolean {
        return companyList.companies.some(company => (company.company_id === companyId && (company.action === 'admin' || company.action === 'owner')));
    }

    const getAllQuizResult = (company_id: number, quiz_id: number) => {
        getLastAnswersCsvFoeQuizInCompanyThunk(company_id, quiz_id)
    }

    const isAdminOrIsOwner = isAdmin(companyList, companyData.company_id)

    const navigate = useNavigate()
    const quiz = (quizzesList.quizzes).map((item: QuizForListState) => {
        return (
            <QuestionRows
                heading={item.quiz_name}
                key={item.quiz_id}
                children={
                    <>
                        <Button onClick={() =>
                            navigate(`/takeQuiz`, {state: {quiz_id: item.quiz_id}})
                        }>Take quiz</Button>
                        {isAdminOrIsOwner &&
                        <>
                            <Button onClick={() => onClickEditQuiz(item.quiz_id)}>Edit quiz</Button>
                            <Button onClick={() => onClickDelete(item.quiz_id)}>Delete quiz</Button>
                            <Button onClick={() => getAllQuizResult(companyData.company_id, item.quiz_id)}>Download
                                Quiz Results</Button>
                        </>}

                    </>}
            />
        )
    })

    return (
        <div data-testid='company-profile-quizzes'>
            {isAdminOrIsOwner &&
            <>
                <Button onClick={() => onClickCreateQuiz()}>Create quiz</Button>
            </>


            }
            {quiz}
            <div className="checkModal">
                <CreateQuizModal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} callback={() => updateQuizList()}
                                 company_id={companyData.company_id}/>
            </div>
            <div className="checkModal">
                <EditQuizModal isOpen={isOpenEdit} toggle={() => setIsOpenEdit(!isOpenEdit)}
                               callback={() => updateQuizList()} quiz_id={modalData}/>
            </div>
        </div>
    );
};

export default CompanyProfileQuizzes;