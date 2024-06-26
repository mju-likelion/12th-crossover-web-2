import PropTypes from "prop-types";
import React from 'react';
import checkBoxIcon from '../Img/checkBox.svg';
import emptyCheckBoxIcon from '../Img/emptycheckBox.svg';

function JoinComponent2({ agree, setAgree, error, policyText }) {
    const policyLines = policyText.split('\n').map((line, index) => (
        <div key={index} style={{ marginLeft: '20px' }}>{line}</div>
    ));

    return (
        <div style={styles.formGroup}>
            <div style={styles.policyHeader}>
                <span>[필수] 개인정보보호정책</span>
                <label style={styles.agreeLabel}>
                    <input
                        type="checkbox"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                        style={{ display: 'none' }}
                    />
                    <span onClick={() => setAgree(!agree)} style={{ cursor: 'pointer' }}>
                        약관동의
                    </span>
                    <img
                        src={agree ? checkBoxIcon : emptyCheckBoxIcon}
                        alt="checkbox"
                        style={{ width: '24px', height: '24px', cursor: 'pointer', marginLeft: '10px' }}
                        onTouchStart={(e) => {
                            setAgree(!agree);
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                    />
                </label>
            </div>
            <div style={styles.policyContainer}>
                {policyLines}
            </div>
            {error && <div style={styles.error}>{error}</div>}
        </div>
    );
}

JoinComponent2.propTypes = {
    agree: PropTypes.bool.isRequired,
    setAgree: PropTypes.func.isRequired,
    error: PropTypes.string,
    policyText: PropTypes.string.isRequired,
};

export default JoinComponent2;

const styles = {
    formGroup: {
        marginBottom: '20px',
        width: '100%',
    },
    policyHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
        fontWeight: 'bold',
    },
    agreeLabel: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '14px',
        color: '#333',
    },
    policyContainer: {
        width: '100%',
        height: '300px',
        padding: '10px',
        fontSize: '14px',
        borderRadius: '15px',
        border: '2px solid #717171',
        overflowY: 'scroll',
        boxSizing: 'border-box',
        textAlign: 'left',
    },
    error: {
        color: 'red',
        fontSize: '12px',
        marginTop: '5px',
    }
};
