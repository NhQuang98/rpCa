package demo3.web.rest;

import demo3.domain.DS;
import demo3.repository.DSRepository;
import demo3.service.DSService;
import demo3.web.rest.vm.StudentVM;
import java.io.File;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import javax.ws.rs.DELETE;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link demo3.domain.DS}.
 */
@RestController
@RequestMapping(value = "/api")
@Transactional
@CrossOrigin(value = "*")
public class DSResource {

    private final Logger log = LoggerFactory.getLogger(DSResource.class);

    private final DSRepository dSRepository;
    private final DSService dsService;

    public DSResource(DSRepository dSRepository, DSService dsService) {
        this.dSRepository = dSRepository;
        this.dsService = dsService;
    }

    /**
     * {@code GET  /ds} : get all the dS.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dS in body.
     */
    @GetMapping("/ds")
    public List<DS> getAllDS() {
        log.debug("REST request to get all DS");
        return dSRepository.findAll();
    }

    @GetMapping("/get-all-list-student")
    public ResponseEntity<List<DS>> getAllListStudent() {
        return ResponseEntity.ok().body(dsService.getAllStudent());
    }

    @PostMapping("/create-student")
    public ResponseEntity<?> createStudent(@RequestBody StudentVM studentVM) {
        return ResponseEntity.ok().body(dsService.createStudent(studentVM));
    }

    /**
     * {@code GET  /ds/:id} : get the "id" dS.
     *
     * @param id the id of the dS to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dS, or with status {@code 404 (Not Found)}.
     */
    //    @GetMapping("/{id}")
    //    public ResponseEntity<DS> getDS(@PathVariable Long id) {
    //        log.debug("REST request to get DS : {}", id);
    //        Optional<DS> dS = dSRepository.findById(id);
    //        return ResponseUtil.wrapOrNotFound(dS);
    //    }

    @GetMapping("/{id}")
    public ResponseEntity<DS> getDS(@PathVariable Long id) {
        DS dS = dSRepository.findById(id).get();
        return new ResponseEntity<>(dS, HttpStatus.OK);
    }

    @PostMapping("/upload")
    public ResponseEntity<?> handleFileUpload(@RequestParam("file") MultipartFile file) {
        String fileName = file.getOriginalFilename();
        try {
            file.transferTo(new File("C:\\upload\\" + fileName));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.ok("File uploaded successfully.");
    }

    @PutMapping("/update-student/{id}")
    public ResponseEntity<?> updateStudent(@RequestBody StudentVM studentVM, @PathVariable Long id) {
        return ResponseEntity.ok().body(dsService.updateStudent(studentVM, id));
    }

    @PostMapping("/delete-student-by-id/{id}")
    public ResponseEntity<?> deleteStudentById(@PathVariable Collection<Long> id) {
        dsService.deleteStudent(id);
        return ResponseEntity.ok().body(true);
    }
}
