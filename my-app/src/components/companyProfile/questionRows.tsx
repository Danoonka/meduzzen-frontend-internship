import React, {ReactNode} from 'react';

interface QuestionRowsProps {
    children: ReactNode;
    heading: string;
}

const QuestionRows = ({children, heading}: QuestionRowsProps) => {
    return (
        <div className="user-row-container">
            <div>
                <h4 className='user-row-container-heading'>{heading}</h4>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
};

export default QuestionRows;