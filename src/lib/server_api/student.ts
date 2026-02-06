"use server";

import Request from "@/utils/Request";

export async function get_student_profile() {
  try {
    const response = await Request({
      url: process.env.BACKEND_HOST + "/api/auth/student",
      method: "GET",
      isAuthorized: true,
    });

    return {
      status: true,
      data: response.data,
    };
  } catch (error: any) {
    const error_message =
      error.response?.data?.message || "Unable to fetch student profile";
    return {
      status: false,
      message: error_message,
    };
  }
}

export async function get_student_exams({
  status = "completed",
}: {
  status?: string;
}) {
  return Request({
    url: process.env.BACKEND_HOST + "/api/students/exams?status=" + status,
    method: "GET",
    isAuthorized: true,
  })
    .then(function (response) {
      return response.data.data;
    })
    .catch(function (error) {
      return Promise.reject(error.response.data.message);
    });
}

export async function make_student_exam_attempt({
  exam_id,
}: {
  exam_id: number;
}) {
  return Request({
    url: process.env.BACKEND_HOST + `/api/students/exams/${exam_id}/attempts`,
    method: "POST",
    isAuthorized: true,
  })
    .then(function (response) {
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response) {
        return Promise.reject(error.response.data.message);
      }
      return Promise.reject("Unknown error occured while starting exam");
    });
}

export async function save_student_exam_attempt({
  exam_id,
  answers,
}: {
  exam_id: number;
  answers: object;
}) {
  return Request({
    url:
      process.env.BACKEND_HOST +
      `/api/students/exams/${exam_id}/attempts/answers`,
    method: "POST",
    isAuthorized: true,
    body: {
      is_auto_submitted: false,
      answer: JSON.stringify(answers),
    },
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        return Promise.reject(error.response.data.message);
      }
      return Promise.reject("Unknown error occured while starting exam");
    });
}

export async function get_student_attempt_answers({
  exam_id,
}: {
  exam_id: number;
}) {
  return Request({
    url:
      process.env.BACKEND_HOST +
      `/api/students/exams/${exam_id}/attempts/1/answers`,
    isAuthorized: true,
    method: "GET",
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        return Promise.reject(error.response.data.message);
      }
      return Promise.reject("Unable to load exam results");
    });
}

export async function get_student_attempt_result({
  exam_id,
}: {
  exam_id: number;
}) {
  try {
    const response = await Request({
      url:
        process.env.BACKEND_HOST +
        `/api/students/exams/${exam_id}/attempts/1/result`,
      isAuthorized: true,
      method: "GET",
    });
    return response.data;
  } catch (error: any) {
    const error_message =
      error.response?.data?.message || "Unable to load exam results";
    return {
      status: false,
      message: error_message,
    };
  }
}

export async function create_attempt_violation({
  exam_id,
  attempt_id,
  description,
  reference_file,
}: {
  exam_id: number;
  attempt_id: number;
  description?: string;
  reference_file?: Blob;
}) {
  const formData = new FormData();
  formData.append("description", description || "Proctoring Violation");
  if (reference_file) {
    formData.append("reference_file", reference_file);
  }

  try {
    const response = await Request({
      url: `${process.env.BACKEND_HOST}/api/students/exams/${exam_id}/attempts/${attempt_id}/violations`,
      isAuthorized: true,
      method: "POST",
      body: formData,
    });

    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Unable to create exam violation");
  }
}

export async function get_attempt_violation({
  exam_id,
  attempt_id,
}: {
  exam_id: number;
  attempt_id: number;
}) {
  try {
    const response = await Request({
      url: `${process.env.BACKEND_HOST}/api/students/exams/${exam_id}/attempts/${attempt_id}/violations`,
      isAuthorized: true,
      method: "GET",
    });

    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Unable to get exam violation");
  }
}

// TODO: Change exam_id to student_id
export async function exam_camera_upload({
  exam_id,
  attempt_id,
  file,
}: {
  exam_id: number;
  attempt_id: number;
  file: Blob;
}) {
  try {
    const body = new FormData();
    body.append("file", file);
    body.append("exam_id", exam_id.toString());
    body.append("user_id", attempt_id.toString());

    const response = await Request({
      // url: `${process.env.BACKEND_HOST}/api/students/exams/${exam_id}/attempts/${attempt_id}/camera_upload`,
      url: `http://localhost:8000/api/v1/frame`,
      method: "POST",
      // isAuthorized: true,
      body,
    });

    return {
      status: true,
      data: response.data,
    };
  } catch (err: any) {
    return {
      status: false,
      message: err.response?.data?.message || "Unable to upload camera image",
    };
  }
}
