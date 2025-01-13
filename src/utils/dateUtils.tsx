export function calculateAge(dateOfBirth:any) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);

    let age = today.getFullYear() - birthDate.getFullYear();

    const isBirthdayPassedThisYear =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

    if (!isBirthdayPassedThisYear) {
        age -= 1;
    }

    return age.toString();
}
