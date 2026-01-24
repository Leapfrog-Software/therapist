<?php

class Therapist {

    public $id;
    public $nameLast;
    public $nameFirst;
    public $kanaLast;
    public $kanaFirst;
    public $address0;
    public $address1;
    public $address2;
    public $address3;
    public $phone;
    public $email;
    public $area;
    public $qualification;
    public $experience;
    public $url;
    public $training;
    public $job;
    public $days;
    public $startHour;
    public $endHour;
    public $dispatch;
    public $sales;
    public $notes;

    static function instantiate($filePath) {

        $fileData = file_get_contents($filePath);
        if ($fileData === false) {
            return null;
        }
        $exploded = explode("<LFGBDY>", $fileData);
        if (count($exploded) < 23) {
            return null;
        }

        $data = new Therapist();
        $data->id = $exploded[0];
        $data->nameLast = $exploded[1];
        $data->nameFirst = $exploded[2];
        $data->kanaLast = $exploded[3];
        $data->kanaFirst = $exploded[4];
        $data->address0 = $exploded[5];
        $data->address1 = $exploded[6];
        $data->address2 = $exploded[7];
        $data->address3 = $exploded[8];
        $data->phone = $exploded[9];
        $data->email = $exploded[10];
        $data->area = $exploded[11];
        $data->qualification = $exploded[12];
        $data->experience = intval($exploded[13]);
        $data->url = $exploded[14];
        $data->training = intval($exploded[15]);
        $data->job = $exploded[16];
        $data->days = intval($exploded[17]);
        $data->startHour = intval($exploded[18]);
        $data->endHour = intval($exploded[19]);
        $data->dispatch = intval($exploded[20]);
        $data->sales = intval($exploded[21]);
        $data->notes = $exploded[22];
        return $data;
    }

    function toResponse() {

        return [
            "id" => $this->id,
            "nameLast" => $this->nameLast,
            "nameFirst" => $this->nameFirst,
            "kanaLast" => $this->kanaLast,
            "kanaFirst" => $this->kanaFirst,
            "address0" => $this->address0,
            "address1" => $this->address1,
            "address2" => $this->address2,
            "address3" => $this->address3,
            "phone" => $this->phone,
            "email" => $this->email,
            "area" => $this->area,
            "qualification" => $this->qualification,
            "experience" => $this->experience,
            "url" => $this->url,
            "training" => $this->training,
            "job" => $this->job,
            "days" => $this->days,
            "startHour" => $this->startHour,
            "endHour" => $this->endHour,
            "dispatch" => $this->dispatch,
            "sales" => $this->sales,
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
            urldecode(getPostParam("nameLast")),
            urldecode(getPostParam("nameFirst")),
            urldecode(getPostParam("kanaLast")),
            urldecode(getPostParam("kanaFirst")),
            urldecode(getPostParam("address0")),
            urldecode(getPostParam("address1")),
            urldecode(getPostParam("address2")),
            urldecode(getPostParam("address3")),
            urldecode(getPostParam("phone")),
            urldecode(getPostParam("email")),
            urldecode(getPostParam("area")),
            urldecode(getPostParam("qualification")),
            getPostParam("experience"),
            urldecode(getPostParam("url")),
            getPostParam("training"),
            urldecode(getPostParam("job")),
            getPostParam("days"),
            getPostParam("startHour"),
            getPostParam("endHour"),
            getPostParam("dispatch"),
            getPostParam("sales"),
            urldecode(getPostParam("notes"))
        ];
        return file_put_contents("../../data/therapist/" . $id . ".txt", implode("<LFGBDY>", $datas)) !== false;
    }
}

?>