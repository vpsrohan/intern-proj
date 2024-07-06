export const useLogin = () => { 

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:3001/login', { email, password });
            
        } catch (error) {
            console.error(error);
        }

        const json = await response.json()
        if(response.ok){
            localStorage.setItem('user', JSON.stringify(json))
        }
    }
    return login
}