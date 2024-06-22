import React from 'react';
import PropTypes from "prop-types";

const PostComponent = ({ title, setTitle, content, setContent, handleSubmit, handleDelete, isReadOnly }) => {
    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>
                        {isReadOnly ? title : ""}
                        <span style={styles.count}>({title.length} / 20)</span>
                    </label>
                    {!isReadOnly && (
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={styles.input}
                            maxLength="20"
                            required
                        />
                    )}
                </div>
                <div style={styles.formGroup}>
                    <textarea
                        value={content}
                        onChange={isReadOnly ? null : (e) => setContent(e.target.value)}
                        style={styles.textarea}
                        maxLength="140"
                        readOnly={isReadOnly}
                        required
                    />
                    <span style={styles.count}>({content.length} / 140)</span>
                </div>
                <p style={styles.note}>※ 작성된 게시글은 수정이 불가합니다.</p>
                <div style={styles.buttonGroup}>
                    <button
                        type="button"
                        style={styles.backButton}
                        onClick={() => handleDelete()}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.backButtonHover.backgroundColor}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.backButton.backgroundColor}
                    >
                        뒤로가기
                    </button>
                    {!isReadOnly ? (
                        <button
                            type="submit"
                            style={styles.button}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                        >
                            작성하기
                        </button>
                    ) : (
                        <button
                            style={styles.button}
                            onClick={() => handleDelete(true)}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                        >
                            삭제하기
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

PostComponent.propTypes = {
    title: PropTypes.any.isRequired,
    setTitle: PropTypes.any.isRequired,
    content: PropTypes.any.isRequired,
    setContent: PropTypes.any.isRequired,
    handleSubmit: PropTypes.any.isRequired,
    handleDelete: PropTypes.any.isRequired,
    isReadOnly: PropTypes.any.isRequired
};

export default PostComponent;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '794px',
        padding: '20px',
        borderRadius: '10px',
    },
    formGroup: {
        marginBottom: '25px',
        position: 'relative',
        borderRadius: '15px',
        border: '2px solid #717171',
        padding: '10px',
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        height: '50px',
    },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '15px',
    },
    textarea: {
        width: '100%',
        fontSize: '16px',
        borderRadius: '15px',
        resize: 'none',
        height: '550px',
        padding: '10px',
        boxSizing: 'border-box',
        border: 'none',
    },
    count: {
        position: 'absolute',
        bottom: '5px',
        right: '10px',
        fontSize: '12px',
        color: '#999',
        marginBottom: '10px',
    },
    note: {
        fontSize: '12px',
        color: '#999',
        textAlign: 'left',
        width: '100%',
        marginTop: '10px',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        width: '150px',
        height: '50px',
        backgroundColor: '#99CEFF',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '15px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    buttonHover: {
        backgroundColor: 'rgb(154, 154, 216)',
    },
    backButton: {
        width: '150px',
        backgroundColor: '#888888',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '15px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    backButtonHover: {
        backgroundColor: '#666666',
    },

};
