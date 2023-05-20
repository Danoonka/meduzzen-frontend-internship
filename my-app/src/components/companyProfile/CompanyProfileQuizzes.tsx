import React, {useEffect, useState} from 'react';
import Button from "../../utils/Button";
import {
    AllActionCompaniesState,
    AllQuizForListState, CompanyItemProps, initialAllActionCompaniesState,
    initialAllQuizForListState, QuizForListState
} from "../../types";
import {deleteQuizThunk, getQuizListThunk, myCompanyListThunk} from "../../store/reduxThunk";
import QuizRows from "./quiz/quizRows";
import CreateQuizModal from "../modalWindows/CreateQuizModal";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import EditQuizModal from "../modalWindows/EditQuizModal";
import {useNavigate} from "react-router-dom";

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
                setCompanyList(res?.data.result)
            })
    }, [companyList.companies.length])

    const updateQuizList = () => {
        getQuizListThunk(companyData.company_id)
            .then((res) => {
                setQuizzesList(res?.data.result)
            })
    }

    useEffect(() => {
        updateQuizList()
    }, [quizzesList.quizzes.length])

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

    const isAdminOrIsOwner = isAdmin(companyList, companyData.company_id)

    const navigate = useNavigate()
    const quiz = (quizzesList.quizzes).map((item: QuizForListState) => {
        return (
            <QuizRows
                quiz={item}
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
                        </>}

                    </>}
            />
        )
    })

    return (
        <div>
            {isAdminOrIsOwner &&
            <Button onClick={() => onClickCreateQuiz()}>Create quiz</Button>
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