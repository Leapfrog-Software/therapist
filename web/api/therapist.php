<?php

class Therapist {

    public $id;
    public $name;
    public $address;
    public $phone;
    public $email;
    public $area;
    public $qualification;
    public $experience;
    public $training;
    public $job;
    public $days;
    public $startHour;
    public $endHour;
    public $dispatch;
    public $sales;
    public $bank;
    public $bankBranch;
    public $bankNo;
    public $notes;

    static function instantiate($filePath) {

        $fileData = file_get_contents($filePath);
        if ($fileData === false) {
            return null;
        }
        $exploded = explode("<LFGBDY>", $fileData);
        if (count($exploded) != 19) {
            return null;
        }

        $data = new Therapist();
        $data->id = $exploded[0];
        $data->name = $exploded[1];
        $data->address = $exploded[2];
        $data->phone = $exploded[3];
        $data->email = $exploded[4];
        $data->area = $exploded[5];
        $data->qualification = $exploded[6];
        $data->experience = intval($exploded[7]);
        $data->training = intval($exploded[8]);
        $data->job = $exploded[9];
        $data->days = intval($exploded[10]);
        $data->startHour = intval($exploded[11]);
        $data->endHour = intval($exploded[12]);
        $data->dispatch = intval($exploded[13]);
        $data->sales = intval($exploded[14]);
        $data->bank = $exploded[15];
        $data->bankBranch = $exploded[16];
        $data->bankNo = $exploded[17];
        $data->notes = $exploded[18];
        return $data;
    }

    function toResponse() {

        return [
            "id" => $this->id,
            "name" => $this->name,
            "address" => $this->address,
            "phone" => $this->phone,
            "email" => $this->email,
            "area" => $this->area,
            "qualification" => $this->qualification,
            "experience" => $this->experience,
            "training" => $this->training,
            "job" => $this->job,
            "days" => $this->days,
            "startHour" => $this->startHour,
            "endHour" => $this->endHour,
            "dispatch" => $this->dispatch,
            "sales" => $this->sales,
            "bank" => $this->bank,
            "bankBranch" => $this->bankBranch,
            "bankNo" => $this->bankNo,
            "notes" => $this->notes
        ];
    }

    static function readAll() {

        $datas = [];

        foreach (glob("../../data/therapist/*", GLOB_BRACE) as $filePath) {
            $data = Therapist::instantiate($filePath);
            if (!is_null($data)) {
                $datas[] = $data;
            }
        }
        return $datas;
    }

    static function create() {

        $id = substr(str_shuffle("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"), 0, 16);

        $datas = [
            $id,
            urldecode(getPostParam("name")),
            urldecode(getPostParam("address")),
            urldecode(getPostParam("phone")),
            urldecode(getPostParam("email")),
            urldecode(getPostParam("area")),
            urldecode(getPostParam("qualification")),
            getPostParam("experience"),
            getPostParam("training"),
            urldecode(getPostParam("job")),
            getPostParam("days"),
            getPostParam("startHour"),
            getPostParam("endHour"),
            getPostParam("dispatch"),
            getPostParam("sales"),
            urldecode(getPostParam("bank")),
            urldecode(getPostParam("bankBranch")),
            urldecode(getPostParam("bankNo")),
            urldecode(getPostParam("notes"))
        ];
        return file_put_contents("../../data/therapist/" . $id . ".txt", implode("<LFGBDY>", $datas)) !== false;
    }
}

?>